package com.example.auctionzone.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuctionResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private BigDecimal startingBid;
    private BigDecimal currentBid;
    private BigDecimal reservePrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
    private Long sellerId;
    private String sellerName;
    private String category;
    private Integer bidCount;
    private String timeRemaining;
    private Boolean isWatched;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

