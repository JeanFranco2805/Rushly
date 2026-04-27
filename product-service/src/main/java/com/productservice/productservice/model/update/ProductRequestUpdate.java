package com.productservice.productservice.model.update;

import org.springframework.stereotype.Component;

public record ProductRequestUpdate (
         String id,
         String name,
         String description,
         double price,
         String imageUrl
){
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
}
