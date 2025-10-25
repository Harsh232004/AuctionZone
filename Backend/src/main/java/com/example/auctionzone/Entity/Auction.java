package com.example.auctionzone.Entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "auctions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Auction extends BaseEntity {

    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "starting_bid", precision = 10, scale = 2)
    private BigDecimal startingBid;

    @Column(name = "current_bid", precision = 10, scale = 2)
    private BigDecimal currentBid;

    @Column(name = "reserve_price", precision = 10, scale = 2)
    private BigDecimal reservePrice;

    @NotNull
    @Column(name = "start_time")
    private LocalDateTime startTime;

    @NotNull
    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private Status status = Status.UPCOMING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    private String category;


    public enum Status {
        UPCOMING, ACTIVE, ENDED, CANCELLED;

        @JsonCreator
        public static Status from(String value) {
            return Status.valueOf(value.toUpperCase());
        }
    }
}
