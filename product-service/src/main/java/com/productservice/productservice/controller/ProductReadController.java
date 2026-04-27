package com.productservice.productservice.controller;
import com.productservice.productservice.model.read.ProductResponse;
import com.productservice.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductReadController {

    public ProductReadController(ProductService service) {
        this.service = service;
    }

    private ProductService service;

    @RequestMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<List<ProductResponse>> getProductByName(@PathVariable String name) {
        return ResponseEntity.ok(service.getProductByName(name));
    }

    @GetMapping("/findByCategory/{category}")
    public ResponseEntity<List<ProductResponse>> getProductByCategory(@PathVariable String category) {
        return ResponseEntity.ok(service.getProductByCategory(category));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable String id) {
        return ResponseEntity.ok(service.getProductById(id));
    }
}
