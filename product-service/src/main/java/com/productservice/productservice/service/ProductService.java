package com.productservice.productservice.service;

import com.productservice.productservice.mapper.create.ProductCreateMapper;
import com.productservice.productservice.mapper.delete.ProductDeleteMapper;
import com.productservice.productservice.mapper.read.ProductReadMapper;
import com.productservice.productservice.mapper.update.ProductUpdateMapper;
import com.productservice.productservice.model.create.ProductRequestCreate;
import com.productservice.productservice.model.delete.ProductRequestDelete;
import com.productservice.productservice.model.read.ProductRequestRead;
import com.productservice.productservice.model.read.ProductResponse;
import com.productservice.productservice.model.update.ProductRequestUpdate;
import com.productservice.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    @Autowired
    private ProductCreateMapper mapperCreate;
    @Autowired
    private ProductUpdateMapper mapperUpdate;

    @Autowired
    private ProductDeleteMapper mapperDelete;

    @Autowired
    private ProductReadMapper mapperRead;

    public void saveProduct(ProductRequestCreate productRequestCreate) {
        repository.save(mapperCreate.toEntity(productRequestCreate));
    }

    public void deleteProduct(ProductRequestDelete productRequestDelete) {
        repository.delete(mapperDelete.toEntity(productRequestDelete));
    }

    public void update(ProductRequestUpdate productRequestUpdate) {
        repository.save(mapperUpdate.toEntity(productRequestUpdate));
    }

    public void deleteAllProducts() {
        repository.deleteAll();
    }

    public void deleteProductById(String id) {
        repository.deleteById(id);
    }

    public ProductResponse getProductById(String id) {
        return mapperRead.toResponse(repository.findById(id).orElseThrow());
    }

    public List<ProductResponse> getAllProducts() {
        return repository.findAll().stream().map(mapperRead::toResponse).toList();
    }

    public List<ProductResponse> getProductByName(String name) {
        return repository.findByName(name).stream().map(mapperRead::toResponse).toList();
    }

    public List<ProductResponse> getProductByCategory(String category) {
        return repository.findByCategoryName(category).stream().map(mapperRead::toResponse).toList();
    }

}
