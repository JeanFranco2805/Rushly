package com.productservice.cartservice.model;

public record CartDTO(
        Long id,
        Long userId
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public Long userId() {
        return userId;
    }
}
