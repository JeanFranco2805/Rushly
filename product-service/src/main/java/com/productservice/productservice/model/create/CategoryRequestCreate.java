package com.productservice.productservice.model.create;

public record CategoryRequestCreate(
        Long id,
        String name,
        String description
) {
}
