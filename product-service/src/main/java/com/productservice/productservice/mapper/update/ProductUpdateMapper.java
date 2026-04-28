package com.productservice.productservice.mapper.update;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.update.ProductRequestUpdate;
import org.springframework.stereotype.Component;

@Component
public class ProductUpdateMapper {

    public Product toEntity(ProductRequestUpdate dto) {
        Product product = new Product();
        product.setId(dto.id());
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setImageUrl(dto.imageUrl());
        product.setStock(dto.stock());
        product.setActive(dto.active());
        return product;
    }

    public ProductRequestUpdate toDTO(Product product) {
        return new ProductRequestUpdate(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getStock(),
                product.isActive()
        );
    }
}