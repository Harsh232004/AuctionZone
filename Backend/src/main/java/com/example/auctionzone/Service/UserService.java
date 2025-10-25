package com.example.auctionzone.Service;

import com.example.auctionzone.dto.request.UserRequest;
import com.example.auctionzone.dto.response.PageResponse;
import com.example.auctionzone.dto.response.UserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    PageResponse<UserResponse> getAllUsers(Pageable pageable);
    UserResponse getUserById(Long id);
    UserResponse createUser(UserRequest request);
    UserResponse updateUser(String username, UserRequest request);
    void deleteUser(Long id);

    // Role & status management
    void updateUserStatus(Long id, String status); // e.g., ACTIVE, INACTIVE, BANNED
    void assignRole(Long id, String role);
    void removeRole(Long id, String role);

    // Search functionality
    PageResponse<UserResponse> searchUsers(String keyword, Pageable pageable);

    // Retrieve users by role or status
    PageResponse<UserResponse> getUsersByRole(String role, Pageable pageable);
    PageResponse<UserResponse> getUsersByStatus(String status, Pageable pageable);

    // Additional info
    List<String> getAllRoles();

}
