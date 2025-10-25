package com.example.auctionzone.exception;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.Map;

@Value
@Builder
public class ErrorResponse {
    boolean success;
    String message;
    String errorCode;
    int status;
    String path;
    LocalDateTime timestamp;
    Map<String, String> fieldErrors;
}

