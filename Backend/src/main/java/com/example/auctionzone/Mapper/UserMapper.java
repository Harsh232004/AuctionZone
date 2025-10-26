package com.example.auctionzone.Mapper;

import com.example.auctionzone.Entity.User;
import com.example.auctionzone.dto.request.UserRequest;
import com.example.auctionzone.dto.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse mapToUserResponse(User user);

    User mapToUser(UserRequest request);
}
