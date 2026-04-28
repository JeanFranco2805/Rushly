package com.productservice.productservice.model.update;

public record ProductRequestUpdate(
        String id,
        String name,
        String description,
        double price,
        String imageUrl,
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
    public int stock() {
        return stock;
    }

    @Override
    public boolean active() {
        return active;
    }
}