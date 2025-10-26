package com.example.auctionzone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AuctionZoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionZoneApplication.class, args);
	}
}
