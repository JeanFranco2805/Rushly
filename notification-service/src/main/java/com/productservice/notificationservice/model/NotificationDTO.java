package com.productservice.notificationservice.model;

import java.time.LocalDateTime;

public record NotificationDTO(
        Long id,
        String message,
        String type,
        Long userId,
        LocalDateTime createdAt
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public String message() {
        return message;
    }

    @Override
    public String type() {
        return type;
    }

    @Override
    public Long userId() {
        return userId;
    }

    @Override
    public LocalDateTime createdAt() {
        return createdAt;
    }
}
