package com.productservice.productservice.model.create;

import com.productservice.productservice.model.Category;

public record ProductRequestCreate(
        String id,
        String name,
        String description,
        double price,
        String imageUrl,
        Category category,
        String brand,
        Long storeId,
        int stock,
        boolean active
) {
    @Override
    public String id() {
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
    public double price() {
        return price;
    }

    @Override
    public String imageUrl() {
        return imageUrl;
    }

    @Override
    public Category category() {
        return category;
    }

    @Override
    public String brand() {
        return brand;
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