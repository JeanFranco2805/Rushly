package com.productservice.orderservice.model;

public record OrderItemDTO(
        Long id,
        String productId,
        int quantity,
        double price
) {
    @Override
    public Long id() {
        return id;
    }

    @Override
    public String productId() {
        return productId;
    }

    @Override
    public int quantity() {
        return quantity;
    }

    @Override
    public double price() {
        return price;
    }
}
