package com.thefive40.net.userservice.model;

import java.time.LocalDateTime;
import java.util.List;

public record StoreDTO(
        Long id,
        String name,
        String description,
        String logoUrl,
        String bannerUrl,
        String phone,
        String email,
        String address,
        String city,
        String country,
        String category,
        String status,
        boolean isOpen,
        Long ownerId,
        LocalDateTime createdAt,
        List<PaymentMethodDTO> paymentMethods
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public String name() {
        return name;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public String logoUrl() {
        return logoUrl;
    }

    @Override
    public String bannerUrl() {
        return bannerUrl;
    }

    @Override
    public String phone() {
        return phone;
    }

    @Override
    public String email() {
        return email;
    }

    @Override
    public String address() {
        return address;
    }

    @Override
    public String city() {
        return city;
    }

    @Override
    public String country() {
        return country;
    }

    @Override
    public String category() {
        return category;
    }

    @Override
    public String status() {
        return status;
    }

    @Override
    public boolean isOpen() {
        return isOpen;
    }

    @Override
    public Long ownerId() {
        return ownerId;
    }

    @Override
    public LocalDateTime createdAt() {
        return createdAt;
    }

    @Override
    public List<PaymentMethodDTO> paymentMethods() {
        return paymentMethods;
    }
}