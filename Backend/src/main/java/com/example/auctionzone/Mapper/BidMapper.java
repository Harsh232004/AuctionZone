package com.example.auctionzone.Mapper;

import com.example.auctionzone.Entity.Bid;
import com.example.auctionzone.dto.request.BidRequest;
import com.example.auctionzone.dto.response.BidResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BidMapper {

    @Mapping(source = "bid.auction.id", target = "auctionId")
    @Mapping(source = "bid.auction.title", target = "auctionTitle")
    @Mapping(source = "bid.bidder.id", target = "bidderId")
    @Mapping(source = "bid.bidder.username", target = "bidderName")
    @Mapping(source = "bid.amount", target = "amount")
    @Mapping(source = "bid.bidTime", target = "bidTime")
    @Mapping(source = "bid.winning", target = "isWinning")
    @Mapping(source = "bid.valid", target = "isValid")
    BidResponse MapToBidResponse(Bid bid);


    Bid MapToBidder(BidRequest request);
}

