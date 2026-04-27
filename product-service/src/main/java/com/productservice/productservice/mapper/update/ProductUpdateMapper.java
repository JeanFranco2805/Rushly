package com.productservice.productservice.mapper.update;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.update.ProductRequestUpdate;
import org.springframework.stereotype.Component;

@Component
public class ProductUpdateMapper {
    public Product toEntity(ProductRequestUpdate productRequestUpdate) {
        Product product = new Product();
        product.setId(productRequestUpdate.id());
        product.setName(productRequestUpdate.name());
        product.setDescription(productRequestUpdate.description());
        product.setPrice(productRequestUpdate.price());
        product.setImageUrl(productRequestUpdate.imageUrl());
        return product;
    }
    public ProductRequestUpdate toDTO(Product product) {
        return new ProductRequestUpdate(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl()
        );
    }
}
