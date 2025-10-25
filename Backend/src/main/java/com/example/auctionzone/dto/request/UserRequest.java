package com.example.auctionzone.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
    public class UserRequest {
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "password must be 8 digit")
    private String password;

    private List<String> roles;
}
