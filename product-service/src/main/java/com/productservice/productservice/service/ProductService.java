package com.productservice.productservice.service;

import com.productservice.productservice.mapper.create.ProductCreateMapper;
import com.productservice.productservice.mapper.delete.ProductDeleteMapper;
import com.productservice.productservice.mapper.read.ProductReadMapper;
import com.productservice.productservice.mapper.update.ProductUpdateMapper;
import com.productservice.productservice.model.create.ProductRequestCreate;
import com.productservice.productservice.model.delete.ProductRequestDelete;
import com.productservice.productservice.model.read.ProductResponse;
import com.productservice.productservice.model.update.ProductRequestUpdate;
import com.productservice.productservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired private ProductRepository repository;
    @Autowired private ProductCreateMapper mapperCreate;
    @Autowired private ProductUpdateMapper mapperUpdate;
    @Autowired private ProductDeleteMapper mapperDelete;
    @Autowired private ProductReadMapper   mapperRead;


    public void saveProduct(ProductRequestCreate dto) {
        repository.save(mapperCreate.toEntity(dto));
    }

    public void update(ProductRequestUpdate dto) {
        repository.findById(dto.id()).ifPresent(existing -> {
            existing.setName(dto.name());
            existing.setDescription(dto.description());
            existing.setPrice(dto.price());
            existing.setImageUrl(dto.imageUrl());
            existing.setStock(dto.stock());
            existing.setActive(dto.active());
            repository.save(existing);
        });
    }

    public void deleteProduct(ProductRequestDelete dto) {
        repository.delete(mapperDelete.toEntity(dto));
    }

    public void deleteProductById(String id) {
        repository.deleteById(id);
    }

    public void deleteAllProducts() {
        repository.deleteAll();
    }


    public ProductResponse getProductById(String id) {
        return mapperRead.toResponse(
                repository.findById(id).orElseThrow(() -> new RuntimeException("Product not found: " + id))
        );
    }

    public List<ProductResponse> getAllProducts() {
        return repository.findByActive(true)
                .stream().map(mapperRead::toResponse).toList();
    }

    public List<ProductResponse> getProductByName(String name) {
        return repository.findByName(name)
                .stream().map(mapperRead::toResponse).toList();
    }

    public List<ProductResponse> getProductByCategory(String category) {
        return repository.findByCategoryNameAndActive(category, true)
                .stream().map(mapperRead::toResponse).toList();
    }


    public List<ProductResponse> getProductsByStore(Long storeId) {
        return repository.findByStoreId(storeId)
                .stream().map(mapperRead::toResponse).toList();
    }

    public List<ProductResponse> getActiveProductsByStore(Long storeId) {
        return repository.findByStoreIdAndActive(storeId, true)
                .stream().map(mapperRead::toResponse).toList();
    }


    public void updateStock(String id, int stock) {
        repository.findById(id).ifPresent(p -> {
            p.setStock(stock);
            repository.save(p);
        });
    }

    public void decrementStock(String id, int quantity) {
        repository.findById(id).ifPresent(p -> {
            int newStock = Math.max(0, p.getStock() - quantity);
            p.setStock(newStock);
            if (newStock == 0) p.setActive(false);
            repository.save(p);
        });
    }

    public void toggleActive(String id) {
        repository.findById(id).ifPresent(p -> {
            p.setActive(!p.isActive());
            repository.save(p);
        });
    }

    public List<ProductResponse> getLowStockByStore(Long storeId, int threshold) {
        return repository.findByStoreIdAndStockLessThan(storeId, threshold)
                .stream().map(mapperRead::toResponse).toList();
    }
}