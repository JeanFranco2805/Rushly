package com.productservice.productservice.model.read;

public record ProductResponse(
        String name,
        String description,
        String category,
        String brand,
        double price,
        String imageUrl,
        String id
) {
}
