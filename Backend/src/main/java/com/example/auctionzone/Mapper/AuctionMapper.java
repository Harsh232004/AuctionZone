package com.example.auctionzone.Mapper;

import com.example.auctionzone.Entity.Auction;
import com.example.auctionzone.dto.request.AuctionRequest;
import com.example.auctionzone.dto.response.AuctionResponse;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AuctionMapper {
    AuctionResponse mapToAuctionResponse(Auction auction);

    Auction mapToAuction(AuctionRequest request);
}
