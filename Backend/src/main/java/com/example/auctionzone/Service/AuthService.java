package com.example.auctionzone.Service;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.dto.request.RegisterRequest;
import com.example.auctionzone.dto.request.LoginRequest;
import com.example.auctionzone.dto.response.LoginResponse;
import com.example.auctionzone.dto.response.UserResponse;


public interface AuthService {
    UserResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);

    LoginResponse loginWithGoogle(String googleToken); // for OAuth
    void logout(Long userId);

    User findOrCreateByEmail(String email, String name);
    User getAuthenticatedUser();
}


