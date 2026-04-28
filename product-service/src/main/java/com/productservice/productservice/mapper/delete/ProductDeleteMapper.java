package com.productservice.productservice.mapper.delete;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.delete.ProductRequestDelete;
import org.springframework.stereotype.Component;

@Component
public class ProductDeleteMapper {

    public Product toEntity(ProductRequestDelete dto) {
        Product product = new Product();
        product.setId(dto.id());
        product.setName(dto.name());
        return product;
    }

    public ProductRequestDelete toDTO(Product product) {
        return new ProductRequestDelete(product.getId(), product.getName());
    }
}