package com.productservice.productservice.model.read;

public record ProductRequestRead(
        String id,
        String name,
        String brand,
        String category
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
    public String brand() {
        return brand;
    }

    @Override
    public String category() {
        return category;
    }
}