package com.productservice.orderservice.model;

import java.time.LocalDateTime;

public record OrderDTO(
        Long id,
        Long userId,
        Long storeId,
        double totalAmount,
        double price,
        String status,
        LocalDateTime orderDate,
        String paymentMethod
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public Long userId() {
        return userId;
    }

    @Override
    public Long storeId() {
        return storeId;
    }

    @Override
    public double totalAmount() {
        return totalAmount;
    }

    @Override
    public double price() {
        return price;
    }

    @Override
    public String status() {
        return status;
    }

    @Override
    public LocalDateTime orderDate() {
        return orderDate;
    }

    @Override
    public String paymentMethod() {
        return paymentMethod;
    }
}