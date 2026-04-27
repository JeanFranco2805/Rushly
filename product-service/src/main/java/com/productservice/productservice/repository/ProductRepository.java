package com.productservice.productservice.repository;

import com.productservice.productservice.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByName(String name);
    List<Product> findByBrand(String brand);

    List<Product> findByCategoryName(String categoryName);

}
