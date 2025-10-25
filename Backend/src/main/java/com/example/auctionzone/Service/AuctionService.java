package com.example.auctionzone.Service;

import com.example.auctionzone.dto.request.AuctionPatchRequest;
import com.example.auctionzone.dto.request.AuctionRequest;
import com.example.auctionzone.dto.response.AuctionResponse;
import com.example.auctionzone.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuctionService {

    // Basic CRUD operations
    PageResponse<AuctionResponse> getAllAuctions(Pageable pageable);
    AuctionResponse getAuctionById(Long id);
    AuctionResponse createAuction(AuctionRequest request);
    AuctionResponse updateAuction(Long id, AuctionRequest request);
    void deleteAuction(Long id);
    AuctionResponse patchAuction(Long id, AuctionPatchRequest Request);

    // Special auction queries
    PageResponse<AuctionResponse> getFeaturedAuctions(Pageable pageable);
    PageResponse<AuctionResponse> getTrendingAuctions(Pageable pageable);
    PageResponse<AuctionResponse> getUpcomingAuctions(Pageable pageable);
    PageResponse<AuctionResponse> getActiveAuctions(Pageable pageable);
    PageResponse<AuctionResponse> getEndedAuctions(Pageable pageable);

    // Category-based queries
    PageResponse<AuctionResponse> getAuctionsByCategory(String category, Pageable pageable);
    List<String> getAllCategories();

    // Seller-based queries
    PageResponse<AuctionResponse> getAuctionsBySeller(Long sellerId, Pageable pageable);

    // Search functionality
    PageResponse<AuctionResponse> searchAuctions(String keyword, Pageable pageable);

    // Status management
    void updateAuctionStatus(Long id, String status);
    void activateAuction(Long id);
    void endAuction(Long id);
    void cancelAuction(Long id);
}

