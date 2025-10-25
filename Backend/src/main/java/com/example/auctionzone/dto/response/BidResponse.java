package com.example.auctionzone.dto.response;

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
public class BidResponse {
    private Long id;
    private BigDecimal amount;
    private Long auctionId;
    private String auctionTitle;
    private Long bidderId;
    private String bidderName;
    private LocalDateTime bidTime;
    private Boolean isWinning;
    private Boolean isValid;
}

