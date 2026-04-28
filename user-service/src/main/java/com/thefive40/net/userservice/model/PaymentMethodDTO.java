package com.thefive40.net.userservice.model;

public record PaymentMethodDTO(
        Long id,
        String type,
        String details,
        boolean isDefault,
        boolean isActive,
        Long storeId
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public String type() {
        return type;
    }

    @Override
    public String details() {
        return details;
    }

    @Override
    public boolean isDefault() {
        return isDefault;
    }

    @Override
    public boolean isActive() {
        return isActive;
    }

    @Override
    public Long storeId() {
        return storeId;
    }
}