package com.productservice.productservice.model.read;

public record ProductRequestRead (
        String id,
        String name,
        String brand,
        String category
)
{

}
