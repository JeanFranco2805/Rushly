package com.productservice.productservice.controller;

import com.productservice.productservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductDeleteController {
    @Autowired
    private ProductService service;

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProduct(String id) {
        service.deleteProductById(id);
        return ResponseEntity.ok("Product deleted");
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllProducts() {
        service.deleteAllProducts();
        return ResponseEntity.ok("All products deleted");
    }

}
