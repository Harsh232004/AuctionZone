package com.example.auctionzone.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Auction ID is required")
    private Long auctionId;
}

