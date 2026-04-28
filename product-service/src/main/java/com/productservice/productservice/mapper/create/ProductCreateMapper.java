package com.productservice.productservice.mapper.create;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.create.ProductRequestCreate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductCreateMapper {

    public Product toEntity(ProductRequestCreate dto) {
        if (dto == null) return null;

        Product product = new Product();
        product.setId(dto.id());
        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setImageUrl(dto.imageUrl());
        product.setCategory(dto.category());
        product.setBrand(dto.brand());
        product.setStoreId(dto.storeId());
        product.setStock(dto.stock() > 0 ? dto.stock() : 100);
        product.setActive(dto.active());
        return product;
    }

    public ProductRequestCreate toDTO(Product product) {
        if (product == null) return null;
        return new ProductRequestCreate(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCategory(),
                product.getBrand(),
                product.getStoreId(),
                product.getStock(),
                product.isActive()
        );
    }

    public List<Product> toEntityList(Iterable<ProductRequestCreate> dtoList) {
        List<Product> list = new ArrayList<>();
        if (dtoList == null) return list;
        for (ProductRequestCreate dto : dtoList) list.add(toEntity(dto));
        return list;
    }
}