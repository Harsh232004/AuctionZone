package com.example.auctionzone.Service.Impl;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.Mapper.AuctionMapper;
import com.example.auctionzone.dto.request.AuctionPatchRequest;
import com.example.auctionzone.dto.request.AuctionRequest;
import com.example.auctionzone.dto.response.AuctionResponse;
import com.example.auctionzone.dto.response.PageResponse;
import com.example.auctionzone.Entity.Auction;
import com.example.auctionzone.Repo.AuctionRepository;
import com.example.auctionzone.Repo.UserRepository;
import com.example.auctionzone.Service.AuctionService;
import com.example.auctionzone.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.FeatureDescriptor;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class AuctionServiceImpl implements AuctionService {

    public AuctionServiceImpl(UserRepository userRepository, AuctionRepository auctionRepository, AuctionMapper auctionMapper) {
        this.userRepository = userRepository;
        this.auctionRepository = auctionRepository;
        this.auctionMapper = auctionMapper;
    }

    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final AuctionMapper auctionMapper;


    @Override
    @Cacheable(value = "auctions", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public PageResponse<AuctionResponse> getAllAuctions(Pageable pageable) {
        log.info("Fetching all auctions with page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<Auction> auctions = auctionRepository.findAll(pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    @Cacheable(value = "auction", key = "#id")
    public AuctionResponse getAuctionById(Long id) {
        log.info("Fetching auction with ID: {}", id);
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction", "id", id));
        return auctionMapper.mapToAuctionResponse(auction);
    }

    // -------- Create/Update/Delete --------

    @Override
    @CacheEvict(value = {"auctions", "featured-auctions", "trending-auctions"}, allEntries = true)
    public AuctionResponse createAuction(AuctionRequest request) {
        log.info("Creating new auction: {}", request.getTitle());

        if (request.getStartTime() == null || request.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        boolean exists = auctionRepository.existsBySellerIdAndTitleIgnoreCaseAndCategoryIgnoreCaseAndStatusIn(
                request.getSellerId(),
                request.getTitle(),
                request.getCategory(),
                List.of(Auction.Status.ACTIVE, Auction.Status.UPCOMING)
        );

        if (exists) {
            throw new RuntimeException("You already have a similar active auction.");
        }

        User seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getSellerId()));

        Auction auction = auctionMapper.mapToAuction(request);

        auction.setCurrentBid(request.getStartingBid());
        auction.setStatus(determineInitialStatus(request.getStartTime()));
        auction.setSeller(seller);

        auction = auctionRepository.save(auction);
        log.info("Created auction with ID: {}", auction.getId());

        return auctionMapper.mapToAuctionResponse(auction);
    }

    @Override
    @CacheEvict(value = {"auction", "auctions", "featured-auctions", "trending-auctions"}, allEntries = true)
    public AuctionResponse updateAuction(Long id, AuctionRequest request) {
        log.info("Updating auction with ID: {}", id);

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction", "id", id));

        if (auction.getStatus() == Auction.Status.ACTIVE) {
            throw new IllegalStateException("Cannot update active auction");
        }

        if (request.getStartTime() == null || request.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        auction.setTitle(request.getTitle());
        auction.setDescription(request.getDescription());
        auction.setImageUrl(request.getImageUrl());
        auction.setStartingBid(request.getStartingBid());
        auction.setReservePrice(request.getReservePrice());
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());
        auction.setCategory(request.getCategory());

        auction = auctionRepository.save(auction);
        log.info("Updated auction with ID: {}", id);

        return auctionMapper.mapToAuctionResponse(auction);
    }

    @Override
    @CacheEvict(value = {"auction", "auctions", "featured-auctions", "trending-auctions"}, allEntries = true)
    public AuctionResponse patchAuction(Long id, AuctionPatchRequest request) {
        log.info("Patching auction with ID: {}", id);

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction", "id", id));

        if (auction.getStatus() == Auction.Status.ACTIVE) {
            throw new IllegalStateException("Cannot update an active auction");
        }

        // Copy only non-null fields
        BeanUtils.copyProperties(request, auction, getNullPropertyNames(request));

        // Handle status update if provided
        if (request.getStatus() != null) {
            Auction.Status newStatus = request.getStatus();
            Auction.Status currentStatus = auction.getStatus();

            if (currentStatus == Auction.Status.ENDED) {
                throw new IllegalStateException("Cannot change status of a completed auction");
            }
            if (currentStatus == Auction.Status.UPCOMING && newStatus == Auction.Status.ENDED) {
                throw new IllegalArgumentException("Cannot complete an auction that hasn't started");
            }
            auction.setStatus(newStatus);
        }

        // Optional validation (only if both provided)
        if (request.getStartTime() != null && request.getEndTime() != null) {
            if (request.getEndTime().isBefore(request.getStartTime())) {
                throw new IllegalArgumentException("End time must be after start time");
            }
        }

        auction = auctionRepository.save(auction);
        log.info("Patched auction with ID: {}", id);

        return auctionMapper.mapToAuctionResponse(auction);
    }


    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        return Arrays.stream(src.getPropertyDescriptors())
                .map(FeatureDescriptor::getName)
                .filter(name -> src.getPropertyValue(name) == null)
                .toArray(String[]::new);
    }


    @Override
    @CacheEvict(value = {"auction", "auctions", "featured-auctions", "trending-auctions"}, allEntries = true)
    public void deleteAuction(Long id) {
        log.info("Deleting auction with ID: {}", id);

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction", "id", id));

        if (auction.getStatus() == Auction.Status.ACTIVE) {
            throw new IllegalStateException("Cannot delete active auction");
        }

        auctionRepository.delete(auction);
        log.info("Deleted auction with ID: {}", id);
    }

    // -------- Lists by type --------

    @Override
    @Cacheable(value = "featured-auctions")
    public PageResponse<AuctionResponse> getFeaturedAuctions(Pageable pageable) {
        log.info("Fetching featured auctions");
        Page<Auction> auctions = auctionRepository.findByStatusOrderByCurrentBidDesc(
                Auction.Status.ACTIVE, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    @Cacheable(value = "trending-auctions")
    public PageResponse<AuctionResponse> getTrendingAuctions(Pageable pageable) {
        log.info("Fetching trending auctions");
        Page<Auction> auctions = auctionRepository.findTrendingAuctions(pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    public PageResponse<AuctionResponse> getUpcomingAuctions(Pageable pageable) {
        log.info("Fetching upcoming auctions");
        Page<Auction> auctions = auctionRepository.findByStatusOrderByStartTime(
                Auction.Status.UPCOMING, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    public PageResponse<AuctionResponse> getActiveAuctions(Pageable pageable) {
        log.info("Fetching active auctions");
        Page<Auction> auctions = auctionRepository.findByStatusOrderByEndTime(
                Auction.Status.ACTIVE, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    public PageResponse<AuctionResponse> getEndedAuctions(Pageable pageable) {
        log.info("Fetching ended auctions");
        Page<Auction> auctions = auctionRepository.findByStatusOrderByEndTimeDesc(
                Auction.Status.ENDED, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    public PageResponse<AuctionResponse> getAuctionsByCategory(String category, Pageable pageable) {
        log.info("Fetching auctions by category: {}", category);
        Page<Auction> auctions = auctionRepository.findByCategoryIgnoreCase(category, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    @Cacheable(value = "categories")
    public List<String> getAllCategories() {
        log.info("Fetching all categories");
        return auctionRepository.findDistinctCategories();
    }

    @Override
    public PageResponse<AuctionResponse> getAuctionsBySeller(Long sellerId, Pageable pageable) {
        log.info("Fetching auctions by seller ID: {}", sellerId);
        Page<Auction> auctions = auctionRepository.findBySellerIdOrderByCreatedAtDesc(sellerId, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    public PageResponse<AuctionResponse> searchAuctions(String keyword, Pageable pageable) {
        log.info("Searching auctions with keyword: {}", keyword);
        Page<Auction> auctions = auctionRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                keyword, keyword, pageable);
        return mapToPageResponse(auctions);
    }

    @Override
    @CacheEvict(value = {"auction", "auctions", "featured-auctions", "trending-auctions"}, allEntries = true)
    public void updateAuctionStatus(Long id, String status) {
        log.info("Updating auction status for ID: {} to {}", id, status);

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction", "id", id));

        Auction.Status parsed;
        try {
            parsed = Auction.Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        auction.setStatus(parsed);
        auctionRepository.save(auction);
    }

    @Override public void activateAuction(Long id) { updateAuctionStatus(id, "ACTIVE"); }
    @Override public void endAuction(Long id)      { updateAuctionStatus(id, "ENDED"); }
    @Override public void cancelAuction(Long id)   { updateAuctionStatus(id, "CANCELLED"); }

    // -------- Helpers --------

    private Auction.Status determineInitialStatus(LocalDateTime startTime) {
        return startTime.isAfter(LocalDateTime.now()) ? Auction.Status.UPCOMING : Auction.Status.ACTIVE;
    }

   /* private String calculateTimeRemaining(LocalDateTime endTime) {
        LocalDateTime now = LocalDateTime.now();
        if (endTime.isBefore(now)) return "Ended";

        long hours = ChronoUnit.HOURS.between(now, endTime);
        long days = hours / 24;

        if (days > 0) return days + " days";
        if (hours > 0) return hours + " hours";
        long minutes = ChronoUnit.MINUTES.between(now, endTime);
        return minutes + " minutes";
    }*/

    private PageResponse<AuctionResponse> mapToPageResponse(Page<Auction> auctionPage) {
        List<AuctionResponse> content = auctionPage.getContent().stream()
                .map(auctionMapper::mapToAuctionResponse)
                .collect(Collectors.toList());

        return PageResponse.<AuctionResponse>builder()
                .content(content)
                .pageNumber(auctionPage.getNumber())
                .pageSize(auctionPage.getSize())
                .totalElements(auctionPage.getTotalElements())
                .totalPages(auctionPage.getTotalPages())
                .first(auctionPage.isFirst())
                .last(auctionPage.isLast())
                .empty(auctionPage.isEmpty())
                .build();
    }
}
