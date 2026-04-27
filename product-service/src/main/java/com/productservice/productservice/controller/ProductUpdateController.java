package com.productservice.productservice.controller;

import com.productservice.productservice.model.update.ProductRequestUpdate;
import com.productservice.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductUpdateController {

    private ProductService service;

    public ProductUpdateController(ProductService service) {
        this.service = service;
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(ProductRequestUpdate requestUpdate) {
        service.update(requestUpdate);
        return ResponseEntity.ok("Product updated");
    }

}
