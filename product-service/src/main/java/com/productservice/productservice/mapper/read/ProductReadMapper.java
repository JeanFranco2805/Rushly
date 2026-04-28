package com.productservice.productservice.mapper.read;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.read.ProductRequestRead;
import com.productservice.productservice.model.read.ProductResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductReadMapper {

    public ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getName(),
                product.getDescription(),
                product.getCategory() != null ? product.getCategory().getName() : null,
                product.getBrand(),
                product.getPrice(),
                product.getImageUrl(),
                product.getId(),
                product.getStoreId(),
                product.getStock(),
                product.isActive()
        );
    }

    public ProductRequestRead toDTO(Product product) {
        return new ProductRequestRead(
                product.getId(),
                product.getName(),
                product.getBrand(),
                product.getCategory() != null ? product.getCategory().getName() : null
        );
    }

    public Product toEntity(ProductRequestRead dto) {
        Product product = new Product();
        product.setId(dto.id());
        product.setName(dto.name());
        product.setBrand(dto.brand());
        return product;
    }

    public List<ProductResponse> toResponseList(List<Product> products) {
        return products.stream().map(this::toResponse).toList();
    }

    public List<ProductRequestRead> toDTOList(List<Product> products) {
        return products.stream().map(this::toDTO).toList();
    }
}