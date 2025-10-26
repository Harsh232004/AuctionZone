package com.example.auctionzone.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class jwtService {

    private final SecretKey key;
    private final long expirationMs;
    private final String issuer;

    public jwtService(
            @Value("${app.jwtSecret}") String secret,
            @Value("${app.jwtExpirationInMs}") long expirationMs,
            @Value("${app.jwtIssuer:auctionzone}") String issuer
    ) {
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalArgumentException("app.jwtSecret must be at least 32 bytes (256 bits)");
        }
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
        this.issuer = issuer;
    }

    // Generate JWT with roles
    public String generateToken(Long userId, String username, String email, List<String> roles) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuer(issuer)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusMillis(expirationMs)))
                .addClaims(Map.of(
                        "username", username,
                        "email", email,
                        "roles", roles // ⚡ include roles
                ))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }


    // Parse JWT claims safely
    public Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(key)
                .requireIssuer(issuer)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract username from JWT
    public String extractUsername(String token) {
        return parseClaims(token).get("username", String.class);
    }

    // Extract roles from JWT
    @SuppressWarnings("unchecked")
    public List<String> extractRoles(String token) {
        Claims claims = parseClaims(token);
        Object rolesObj = claims.get("roles");
        if (rolesObj instanceof List<?> rolesList) {
            return rolesList.stream()
                    .map(Object::toString)
                    .toList();
        }
        return List.of();
    }

    // Check if JWT expired
    public boolean isExpired(String token) {
        try {
            Date exp = parseClaims(token).getExpiration();
            return exp == null || exp.before(new Date());
        } catch (Exception e) {
            return true; // treat as expired if parsing fails
        }
    }

    // Validate JWT
    public boolean validateToken(String token) {
        try {
            return !isExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}
