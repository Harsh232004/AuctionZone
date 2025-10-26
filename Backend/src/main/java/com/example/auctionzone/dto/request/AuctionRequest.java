package com.example.auctionzone.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuctionRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    private String imageUrl;

    @NotNull(message = "Starting bid is required")
    @DecimalMin(value = "0.01", message = "Starting bid must be positive")
    private BigDecimal startingBid;

    @DecimalMin(value = "0.01", message = "Reserve price must be positive")
    private BigDecimal reservePrice;

    @NotNull(message = "Start time is required")
    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;

    @NotNull(message = "Seller ID is required")
    private Long sellerId;

    @Size(max = 100, message = "Category must not exceed 100 characters")
    private String category;
}

