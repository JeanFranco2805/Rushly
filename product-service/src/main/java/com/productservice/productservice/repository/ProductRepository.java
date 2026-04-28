package com.productservice.productservice.repository;

import com.productservice.productservice.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    List<Product> findByName(String name);

    List<Product> findByBrand(String brand);

    List<Product> findByCategoryName(String categoryName);

    List<Product> findByActive(boolean active);

    List<Product> findByStoreId(Long storeId);

    List<Product> findByStoreIdAndActive(Long storeId, boolean active);

    List<Product> findByCategoryNameAndActive(String categoryName, boolean active);

    long countByStoreId(Long storeId);

    long countByStoreIdAndActive(Long storeId, boolean active);

    List<Product> findByStoreIdAndStockLessThan(Long storeId, int stock);
}