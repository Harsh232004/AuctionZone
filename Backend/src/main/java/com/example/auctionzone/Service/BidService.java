package com.example.auctionzone.Service;

import com.example.auctionzone.dto.request.BidRequest;
import com.example.auctionzone.dto.response.BidResponse;

import java.util.List;
import java.util.Optional;

public interface BidService {
    BidResponse placeBid(BidRequest request);
    List<BidResponse> getBidHistory(Long auctionId);
    Optional<BidResponse> getCurrentBid(Long auctionId);
    List<BidResponse> getBidderRanking(Long auctionId);
    List<BidResponse> getAllBids();
    void deleteBidById(Long id);
    void deleteAllByAuctionId(Long auctionId);
}
