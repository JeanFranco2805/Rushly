package com.productservice.productservice.mapper.create;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.create.ProductRequestCreate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductCreateMapper {
    public ProductRequestCreate toDTO(Product product) {
        if (product == null) {
            return null;
        }
        ProductRequestCreate dto = new ProductRequestCreate(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory(),
                product.getBrand()
        );
        return dto;
    }

    public Product toEntity(ProductRequestCreate dto) {
        if (dto == null) {
            return null;
        }
        Product product = new Product();
        product.setId(dto.id());
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        return product;
    }

    public List<Product> toEntityList(Iterable<ProductRequestCreate> dtoList) {
        if (dtoList == null) {
            return null;
        }
        List<Product> entityList = new ArrayList<>();
        for (ProductRequestCreate dto : dtoList) {
            entityList.add(toEntity(dto));
        }
        return entityList;
    }

    public Iterable<ProductRequestCreate> toDTOList(Iterable<Product> products) {
        if (products == null) {
            return null;
        }
        List<ProductRequestCreate> dtoList = new ArrayList<>();
        for (Product product : products) {
            dtoList.add(toDTO(product));
        }
        return dtoList;
    }
}
