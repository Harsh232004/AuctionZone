package com.example.auctionzone.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidRequest {

    @NotNull(message = "Bid amount is required")
    @DecimalMin(value = "0.01", message = "Bid amount must be positive")
    private BigDecimal amount;

    @NotNull(message = "Auction ID is required")
    private Long auctionId;

    @NotNull(message = "Bidder ID is required")
    private Long bidderId;
}

