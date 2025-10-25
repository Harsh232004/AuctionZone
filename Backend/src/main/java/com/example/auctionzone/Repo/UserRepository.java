package com.example.auctionzone.Repo;

import com.example.auctionzone.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    // ✅ Existence checks (for registration)
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    // ✅ For paginated search
    Page<User> findByUsernameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<User> findByEmailContainingIgnoreCase(String keyword, Pageable pageable);

    // Example: fetch all active users (if you have a "status" field in User entity)
//    Page<User> findByStatus(String status, Pageable pageable);
}



