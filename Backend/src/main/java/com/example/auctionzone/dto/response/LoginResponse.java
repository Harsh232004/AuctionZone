package com.example.auctionzone.dto.response;

public record LoginResponse(
        String accessToken,   // JWT or opaque token
        String tokenType,     // usually "Bearer"
        UserResponse user
) {
    public static LoginResponse of(String token, UserResponse user) {
        return new LoginResponse(token, "Bearer", user);
    }
}

