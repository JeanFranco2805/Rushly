package com.productservice.productservice.model.read;

public record ProductResponse(
        String name,
        String description,
        String category,
        String brand,
        double price,
        String imageUrl,
        String id,
        Long storeId,
        int stock,
        boolean active
) {
    @Override
    public String name() {
        return name;
    }

    @Override
    public String description() {
        return description;
    }

    @Override
    public String category() {
        return category;
    }

    @Override
    public String brand() {
        return brand;
    }

    @Override
    public double price() {
        return price;
    }

    @Override
    public String imageUrl() {
        return imageUrl;
    }

    @Override
    public String id() {
        return id;
    }

    @Override
    public Long storeId() {
        return storeId;
    }

    @Override
    public int stock() {
        return stock;
    }

    @Override
    public boolean active() {
        return active;
    }
}