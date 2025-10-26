package com.example.auctionzone.Service.Impl;

import com.example.auctionzone.Mapper.BidMapper;
import com.example.auctionzone.Service.AuthService;
import com.example.auctionzone.Service.BidService;
import com.example.auctionzone.dto.request.BidRequest;
import com.example.auctionzone.dto.request.LoginRequest;
import com.example.auctionzone.dto.response.BidResponse;
import com.example.auctionzone.Entity.Auction;
import com.example.auctionzone.Entity.Bid;
import com.example.auctionzone.Entity.User;
import com.example.auctionzone.Repo.AuctionRepository;
import com.example.auctionzone.Repo.BidRepository;
import com.example.auctionzone.Repo.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;
    private final AuctionRepository auctionRepository;
    private final AuthService authService;
    private final BidMapper bidMapper;

    private static final int BID_COOLDOWN_SECONDS = 10;

    @Transactional
    @Override
    public BidResponse placeBid(BidRequest request) {
        log.info("Received bid request: {}", request);

        User currentUser;
        try {
            currentUser = authService.getAuthenticatedUser();
            log.info("Authenticated user: {} (id={})", currentUser.getUsername(), currentUser.getId());
        } catch (Exception e) {
            log.error("Failed to get authenticated user", e);
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User must be logged in");
        }

        Auction auction = auctionRepository.findById(request.getAuctionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Auction not found"));
        log.info("Auction fetched: id={}, title={}, status={}", auction.getId(), auction.getTitle(), auction.getStatus());

        if (auction.getStatus() != Auction.Status.ACTIVE) {
            log.error("Auction is not active. Status: {}", auction.getStatus());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Auction is not active.");
        }
        if (auction.getEndTime().isBefore(LocalDateTime.now())) {
            log.error("Auction has ended. End time: {}", auction.getEndTime());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Auction has ended.");
        }

        if (auction.getSeller().getId().equals(currentUser.getId())) {
            log.error("Seller tried to bid on own auction");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Seller cannot bid on their own auction.");
        }

        BigDecimal currentHighest = bidRepository.findHighestBidAmountByAuctionId(auction.getId())
                .orElse(auction.getStartingBid());
        log.info("Current highest bid: {}", currentHighest);

        if (request.getAmount().compareTo(currentHighest) <= 0) {
            log.error("Bid amount too low: {}", request.getAmount());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bid must be higher than current highest bid.");
        }

        Optional<Bid> lastBid = bidRepository
                .findTopByBidderIdAndAuctionIdOrderByBidTimeDesc(currentUser.getId(), auction.getId());
        lastBid.ifPresent(b -> {
            Duration diff = Duration.between(b.getBidTime(), LocalDateTime.now());
            if (diff.getSeconds() < BID_COOLDOWN_SECONDS) {
                log.error("Bid spam detected: last bid {} seconds ago", diff.getSeconds());
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "You are bidding too frequently. Please wait.");
            }
        });


        bidRepository.invalidatePreviousWinningBid(auction.getId());
        log.info("Previous winning bids invalidated");

        Bid newBid = bidMapper.MapToBidder(request);
        newBid.setAuction(auction);
        newBid.setBidder(currentUser);
        newBid.setBidTime(LocalDateTime.now());
        newBid.setWinning(true);
        newBid.setValid(true);

        Bid savedBid = bidRepository.save(newBid);

        savedBid.getAuction().getId();
        savedBid.getBidder().getId();
        log.info("New bid saved: id={}, amount={}", newBid.getId(), newBid.getAmount());

        auction.setCurrentBid(newBid.getAmount());
        auctionRepository.save(auction);
        log.info("Auction current bid updated: {}", auction.getCurrentBid());

        BidResponse response = bidMapper.MapToBidResponse(savedBid);
        log.info("BidResponse prepared: {}", response);

        return response;
    }


    @Override
    public List<BidResponse> getBidHistory(Long auctionId) {
        List<Bid> bids = bidRepository.findByAuctionIdOrderByBidTimeDesc(auctionId);
        return bids.stream()
                .map(bidMapper::MapToBidResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<BidResponse> getCurrentBid(Long auctionId) {
        return bidRepository.findByIdWithAuctionAndBidder(auctionId)
                .map(bidMapper::MapToBidResponse);
    }

    @Override
    public List<BidResponse> getBidderRanking(Long auctionId) {
        List<Bid> rankedBids = bidRepository.findByAuctionIdOrderByAmountDesc(auctionId);
        return rankedBids.stream()
                .map(bidMapper::MapToBidResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BidResponse> getAllBids() {
        List<Bid> bids = bidRepository.findAll();
        return bids.stream()
                .map(bidMapper::MapToBidResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteBidById(Long id) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Bid Not Found"));

        bidRepository.delete(bid);
    }

    @Override
    @Transactional
    public void deleteAllByAuctionId(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Auction Not Found"));

        bidRepository.deleteAllByAuctionId(auctionId);
    }

}
