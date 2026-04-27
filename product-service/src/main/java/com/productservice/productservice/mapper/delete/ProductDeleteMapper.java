package com.productservice.productservice.mapper.delete;

import com.productservice.productservice.model.Product;
import com.productservice.productservice.model.delete.ProductRequestDelete;
import org.springframework.stereotype.Component;

@Component
public class ProductDeleteMapper {
    public Product toEntity(ProductRequestDelete productRequestDelete) {
        Product product = new Product();
        product.setId(productRequestDelete.id());
        product.setName(productRequestDelete.name());
        return product;
    }
    public ProductRequestDelete toDTO(Product product) {
        return new ProductRequestDelete(product.getId(), product.getName());
    }
}
