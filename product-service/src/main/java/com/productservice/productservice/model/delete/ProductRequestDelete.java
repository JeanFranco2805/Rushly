package com.productservice.productservice.model.delete;

public record ProductRequestDelete(
        String id,
        String name
) {
    @Override
    public String id() {
        return id;
    }

    @Override
    public String name() {
        return name;
    }
}
