package com.example.auctionzone.Service.Impl;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.Mapper.UserMapper;
import com.example.auctionzone.Repo.UserRepository;
import com.example.auctionzone.Service.UserService;
import com.example.auctionzone.dto.request.UserRequest;
import com.example.auctionzone.dto.response.PageResponse;
import com.example.auctionzone.dto.response.UserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Cacheable(value = "users", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    @Override
    public PageResponse<UserResponse> getAllUsers(Pageable pageable) {
        log.info("Fetching all users with page: {}, size: {}", pageable.getPageNumber(), pageable.getPageSize());
        Page<User> users = userRepository.findAll(pageable);
        return mapToPageResponse(users);
    }

    @Cacheable(value = "users", key = "#id")
    @Override
    public UserResponse getUserById(Long id) {
        log.info("Fetching the user by Id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User with Id: {}" + id + "Not found"));

        return userMapper.mapToUserResponse(user);
    }

    @Override
    public UserResponse createUser(UserRequest request) {
        log.info("Incoming Request: {}", request);

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User with this email already exists!");
        }

        if (request.getUsername() != null && userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken!");
        }

        User user = userMapper.mapToUser(request);

        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            user.setRoles(List.of("ROLE_USER"));
        }

        User savedUser = userRepository.save(user);
        log.info("User Saved: {}", savedUser);

        return userMapper.mapToUserResponse(savedUser);
    }


    @Override
    public UserResponse updateUser(String username, UserRequest request) {
        log.info("Update Request for email {}: {}", username, request);

        User existingUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        if (!existingUser.getEmail().equals(request.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists in the database");
        }

        if (!existingUser.getUsername().equals(request.getUsername()) &&
                request.getUsername() != null &&
                userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken!");
        }

        existingUser.setUsername(request.getUsername());
        existingUser.setEmail(request.getEmail());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            existingUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            existingUser.setRoles(request.getRoles());
        }

        User updatedUser = userRepository.save(existingUser);
        log.info("User Updated: {}", updatedUser);

        return userMapper.mapToUserResponse(updatedUser);
    }


    @CacheEvict(value = "users", key = "#id")
    @Override
    public void deleteUser(Long id) {
        log.info("Deleting the user with id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }

    @Override
    public void updateUserStatus(Long id, String status) {

    }

    @Override
    public void assignRole(Long id, String role) {

    }

    @Override
    public void removeRole(Long id, String role) {

    }

    @Override
    public PageResponse<UserResponse> searchUsers(String keyword, Pageable pageable) {
        return null;
    }

    @Override
    public PageResponse<UserResponse> getUsersByRole(String role, Pageable pageable) {
        return null;
    }

    @Override
    public PageResponse<UserResponse> getUsersByStatus(String status, Pageable pageable) {
        return null;
    }

    @Override
    public List<String> getAllRoles() {
        return List.of();
    }

    private PageResponse<UserResponse> mapToPageResponse(Page<User> userPage) {
        List<UserResponse> content = userPage.getContent().stream()
                .map(userMapper::mapToUserResponse)
                .collect(Collectors.toList());

        return PageResponse.<UserResponse>builder()
                .content(content)
                .pageNumber(userPage.getNumber())
                .pageSize(userPage.getSize())
                .totalElements(userPage.getTotalElements())
                .totalPages(userPage.getTotalPages())
                .first(userPage.isFirst())
                .last(userPage.isLast())
                .empty(userPage.isEmpty())
                .build();
    }
}
