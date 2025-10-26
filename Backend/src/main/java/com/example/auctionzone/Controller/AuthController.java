package com.example.auctionzone.Controller;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.Service.AuthService;
import com.example.auctionzone.Service.jwtService;
import com.example.auctionzone.dto.request.LoginRequest;
import com.example.auctionzone.dto.request.RegisterRequest;
import com.example.auctionzone.dto.response.ApiResponse;
import com.example.auctionzone.dto.response.LoginResponse;
import com.example.auctionzone.dto.response.UserResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    public AuthController(AuthService authService, jwtService jwtService) {
        this.authService = authService;
        JwtService = jwtService;
    }

    private final AuthService authService;
    private final jwtService JwtService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest req) {
        UserResponse user = authService.register(req);
        return ResponseEntity.ok(new ApiResponse<>(true, "Registered", user, null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest req) {
        LoginResponse out = authService.login(req); // builds token + user dto
        return ResponseEntity.ok(new ApiResponse<>(true, "Logged in", out, null));
    }

    @GetMapping("/google/success")
    public ResponseEntity<?> googleLogin(@AuthenticationPrincipal OAuth2User oauthUser) {
        if (oauthUser == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No authenticated user"));
        }
        Map<String, Object> attributes = oauthUser.getAttributes();
        String providerId = (String) attributes.get("sub");
        String username = (String) attributes.get("name");
        String email = (String) attributes.get("email");
        User user = authService.findOrCreateByEmail(email, username);
        String jwt = JwtService.generateToken(Long.valueOf(providerId), username, email, user.getRoles());
        return ResponseEntity.ok(Map.of(
                "accessToken", jwt,
                "user", Map.of("id", user.getId(),
                        "username", user.getUsername(), "email", user.getEmail())
        ));
    }
}
