package com.example.auctionzone.Service.Impl;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.Mapper.UserMapper;
import com.example.auctionzone.Repo.UserRepository;
import com.example.auctionzone.Service.AuthService;
import com.example.auctionzone.Service.jwtService;
import com.example.auctionzone.dto.request.LoginRequest;
import com.example.auctionzone.dto.request.RegisterRequest;
import com.example.auctionzone.dto.request.UserRequest;
import com.example.auctionzone.dto.response.LoginResponse;
import com.example.auctionzone.dto.response.UserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;


@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserServiceImpl userService;
    private final jwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, jwtService jwtService1, UserMapper userMapper, UserServiceImpl userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService1;
        this.userService = userService;
    }


    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request);

        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(request.username().trim());
        userRequest.setEmail(request.email().trim().toLowerCase());
        userRequest.setPassword(request.password());
        userRequest.setRoles(List.of("ROLE_USER"));

        UserResponse createdUser = userService.createUser(userRequest);

        log.info("Registration successful for user: {}", createdUser.getEmail());

        return createdUser;
    }


    @Override
    public LoginResponse login(LoginRequest req) {

        User user = userRepository.findByEmail(req.email().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        // Check password
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        // Generate JWT with actual user roles
        String token = jwtService.generateToken(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles() // Use roles from the database
        );


        UserResponse userResponse = UserResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(Collections.singletonList(String.join(",", user.getRoles())))
                .build();

        return LoginResponse.of(token, userResponse);
    }

    @Override
    public LoginResponse loginWithGoogle(String googleToken) {
        return null;
    }

    @Override
    public void logout(Long userId) {

    }


    @Override
    public User findOrCreateByEmail(String email, String name) {
        return null;
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Authentication object: {}", authentication);

        if (authentication == null || !authentication.isAuthenticated()) {
            log.error("User is not authenticated");
            throw new RuntimeException("User is not authenticated");
        }

        Object principal = authentication.getPrincipal();
        log.info("Principal object: {}", principal);

        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal; // sometimes JWT filter sets principal as email
        } else {
            log.error("Unknown principal type: {}", principal.getClass());
            throw new RuntimeException("User not found");
        }

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}

