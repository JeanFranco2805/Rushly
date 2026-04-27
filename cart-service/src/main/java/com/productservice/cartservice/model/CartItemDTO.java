package com.productservice.cartservice.model;

public record CartItemDTO (
        Long id,
        String productId,
        Long cartId,
        Integer quantity,
        Double price
){
    @Override
    public Long id() {
        return id;
    }

    @Override
    public String productId() {
        return productId;
    }

    @Override
    public Long cartId() {
        return cartId;
    }

    @Override
    public Integer quantity() {
        return quantity;
    }

    @Override
    public Double price() {
        return price;
    }
}
