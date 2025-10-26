package com.example.auctionzone.dto.request;


import com.example.auctionzone.Entity.Auction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionPatchRequest {

        private String title;
        private String description;
        private String imageUrl;
        private BigDecimal startingBid;
        private BigDecimal reservePrice;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String category;
        private Auction.Status status;
    }

