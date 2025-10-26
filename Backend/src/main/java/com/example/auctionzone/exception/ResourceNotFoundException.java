package com.example.auctionzone.exception;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {

    private final String resource;
    private final String field;
    private final String value;

    public ResourceNotFoundException(String resource, String field, Object value) {
        super(String.format("%s not found with %s: '%s'", resource, field, String.valueOf(value)));
        this.resource = resource;
        this.field = field;
        this.value = String.valueOf(value);
    }

}

