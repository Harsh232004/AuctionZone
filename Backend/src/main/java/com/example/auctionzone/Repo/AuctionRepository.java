package com.example.auctionzone.Repo;

import com.example.auctionzone.Entity.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {

    // Status-based queries (use the exact enum type defined inside Auction)
    Page<Auction> findByStatusOrderByCurrentBidDesc(Auction.Status status, Pageable pageable);
    Page<Auction> findByStatusOrderByStartTime(Auction.Status status, Pageable pageable);
    Page<Auction> findByStatusOrderByEndTime(Auction.Status status, Pageable pageable);
    Page<Auction> findByStatusOrderByEndTimeDesc(Auction.Status status, Pageable pageable);

    // Category-based queries
    Page<Auction> findByCategoryIgnoreCase(String category, Pageable pageable);

    @Query("SELECT DISTINCT a.category FROM Auction a WHERE a.category IS NOT NULL")
    List<String> findDistinctCategories();

    // Seller-based queries
    Page<Auction> findBySellerIdOrderByCreatedAtDesc(Long sellerId, Pageable pageable);

    // Search queries
    Page<Auction> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title, String description, Pageable pageable
    );

    // Trending: if you don't have a mapped 'bids' collection, avoid SIZE(a.bids)
    // Sort active auctions by currentBid DESC, then by endTime ASC (ending sooner first)
    @Query("SELECT a FROM Auction a WHERE a.status = com.example.auctionzone.Entity.Auction.Status.ACTIVE " +
            "ORDER BY a.currentBid DESC, a.endTime ASC")
    Page<Auction> findTrendingAuctions(Pageable pageable);

    // Count queries
    @Query("SELECT COUNT(a) FROM Auction a WHERE a.seller.id = :sellerId")
    Long countBySellerId(@Param("sellerId") Long sellerId);

    @Query("SELECT COUNT(a) FROM Auction a WHERE a.status = :status")
    Long countByStatus(@Param("status") Auction.Status status);


    boolean existsBySellerIdAndTitleIgnoreCaseAndCategoryIgnoreCaseAndStatusIn(
            Long sellerId,
            String title,
            String category,
            List<Auction.Status> status
    );
}
