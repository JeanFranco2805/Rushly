package com.productservice.productservice.mapper.read;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.read.ProductRequestRead;
import com.productservice.productservice.model.read.ProductResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductReadMapper {
    public Product toEntity(ProductRequestRead productRequestRead) {
        Product product = new Product();
        product.setId(productRequestRead.id());
        product.setName(productRequestRead.name());
        product.setBrand(productRequestRead.brand());
        return product;
    }

    public ProductRequestRead toDTO(Product product) {
        ProductRequestRead read = new ProductRequestRead(
                product.getId(),
                product.getName(),
                product.getBrand(),
                product.getCategory().getName()
        );
        return read;
    }

    public ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse(
                product.getName(),
                product.getDescription(),
                product.getCategory().getName(),
                product.getBrand(),
                product.getPrice(),
                product.getImageUrl(),
                product.getId()
        );
        return response;
    }

    public List<ProductRequestRead> toDTOList(List<Product> products) {
        return products.stream().map(this::toDTO).toList();
    }
    public List<Product> toEntityList(List<ProductRequestRead> productsDTO) {
        return productsDTO.stream().map(this::toEntity).toList();
    }

}
