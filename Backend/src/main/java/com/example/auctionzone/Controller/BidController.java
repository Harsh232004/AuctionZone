package com.example.auctionzone.Controller;

import com.example.auctionzone.Entity.Bid;
import com.example.auctionzone.Service.BidService;
import com.example.auctionzone.Service.Impl.BidServiceImpl;
import com.example.auctionzone.dto.request.BidRequest;
import com.example.auctionzone.dto.response.BidResponse;
import com.example.auctionzone.dto.response.UserResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    private final BidServiceImpl bidService;

    public BidController(BidServiceImpl bidService) {
        this.bidService = bidService;
    }

    @PostMapping
    public ResponseEntity<BidResponse> bidPlaceByUser(@Valid @RequestBody BidRequest request) {
        BidResponse bidResponse = bidService.placeBid(request);
        return ResponseEntity.ok(bidResponse);
    }

    @GetMapping("/history")
    public ResponseEntity<List<BidResponse>> getBidHistory(Long auctionId) {
        List<BidResponse> bidHistory = bidService.getBidHistory(auctionId);
        return ResponseEntity.ok(bidHistory);
    }

    @GetMapping("/currentBid")
    public ResponseEntity<Optional<BidResponse>> getCurrentBid(Long auctionId) {
        bidService.getCurrentBid(auctionId);
        return ResponseEntity.ok(bidService.getCurrentBid(auctionId));
    }

    @GetMapping("/BidderRank")
    public ResponseEntity<List<BidResponse>> getBidderRanking(Long auctionId) {
        List<BidResponse> bidderRanking = bidService.getBidderRanking(auctionId);
        return ResponseEntity.ok(bidderRanking);
    }

    @GetMapping("/")
    public ResponseEntity<List<BidResponse>> getAllBids() {
        List<BidResponse> bids = bidService.getAllBids();
        return ResponseEntity.ok(bids);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        bidService.deleteBidById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/auction/{auctionId}")
    public ResponseEntity<?> deleteByAuctionId(@PathVariable Long auctionId) {
        bidService.deleteAllByAuctionId(auctionId);
        return ResponseEntity.noContent().build();
    }


}
