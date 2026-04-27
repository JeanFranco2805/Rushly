package com.productservice.productservice.repository;

import com.productservice.productservice.model.Category;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;

@Document(collection = "categories")
public interface CategoryRepository extends MongoRepository<Category, Long> {
}
