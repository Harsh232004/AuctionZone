package com.example.auctionzone.Controller;

import com.example.auctionzone.dto.request.AuctionPatchRequest;
import com.example.auctionzone.dto.request.AuctionRequest;
import com.example.auctionzone.dto.response.AuctionResponse;
import com.example.auctionzone.dto.response.PageResponse;
import com.example.auctionzone.dto.response.ApiResponse;
import com.example.auctionzone.Service.AuctionService;
import jakarta.validation.Valid;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auctions")
public class AuctionController {

    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @GetMapping
    @Cacheable(value = "auctions", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public ResponseEntity<PageResponse<AuctionResponse>> getAllAuctions(Pageable pageable) {
        return ResponseEntity.ok(auctionService.getAllAuctions(pageable));
    }

    @GetMapping("/{id}")
    @Cacheable(value = "auction", key = "#id")
    public ResponseEntity<AuctionResponse> getAuctionById(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.getAuctionById(id));
    }

    @GetMapping("/featured")
    @Cacheable(value = "featured-auctions")
    public ResponseEntity<PageResponse<AuctionResponse>> getFeaturedAuctions(Pageable pageable) {
        return ResponseEntity.ok(auctionService.getFeaturedAuctions(pageable));
    }

    @GetMapping("/trending")
    @Cacheable(value = "trending-auctions")
    public ResponseEntity<PageResponse<AuctionResponse>> getTrendingAuctions(Pageable pageable) {
        return ResponseEntity.ok(auctionService.getTrendingAuctions(pageable));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AuctionResponse>> createAuction(@Valid @RequestBody AuctionRequest request) {
        AuctionResponse auction = auctionService.createAuction(request);
        ApiResponse<AuctionResponse> body = new ApiResponse<>(true, "Auction created successfully", auction, null);
        return ResponseEntity.ok(body);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AuctionResponse>> updateAuction(@PathVariable Long id,
                                                                      @Valid @RequestBody AuctionRequest request) {
        AuctionResponse auction = auctionService.updateAuction(id, request);
        ApiResponse<AuctionResponse> body = new ApiResponse<>(true, "Auction updated successfully", auction, null);
        return ResponseEntity.ok(body);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAuction(@PathVariable Long id) {
        auctionService.deleteAuction(id);
        ApiResponse<Void> body = new ApiResponse<>(true, "Auction deleted successfully", null, null);
        return ResponseEntity.ok(body);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApiResponse<AuctionResponse>> updateAuctionPartially(@PathVariable Long id, @RequestBody AuctionPatchRequest Request) {
        AuctionResponse auctionResponse = auctionService.patchAuction(id, Request);
        ApiResponse<AuctionResponse> body = new ApiResponse<>(true, "Auction updated successfully", auctionResponse, null);
        return ResponseEntity.ok(body);
    }
}
