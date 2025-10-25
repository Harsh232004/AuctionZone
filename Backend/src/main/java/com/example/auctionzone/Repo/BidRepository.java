package com.example.auctionzone.Repo;

import com.example.auctionzone.Entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query("SELECT MAX(b.amount) FROM Bid b WHERE b.auction.id = :auctionId AND b.valid = true")
    Optional<BigDecimal> findHighestBidAmountByAuctionId(Long auctionId);

    @Query("SELECT b FROM Bid b JOIN FETCH b.auction JOIN FETCH b.bidder WHERE b.id = :id")
    Optional<Bid> findByIdWithAuctionAndBidder(@Param("id") Long id);


    @Modifying
    @Transactional
    @Query("UPDATE Bid b SET b.winning = false WHERE b.auction.id = :auctionId AND b.winning = true ")
    void invalidatePreviousWinningBid(Long auctionId);

    Optional<Bid> findTopByBidderIdAndAuctionIdOrderByBidTimeDesc(Long bidderId, Long auctionId);

    List<Bid> findByAuctionIdOrderByAmountDesc(Long auctionId);

    List<Bid> findByAuctionIdOrderByBidTimeDesc(Long auctionId);

    void deleteAllByAuctionId(Long auctionId);


}
