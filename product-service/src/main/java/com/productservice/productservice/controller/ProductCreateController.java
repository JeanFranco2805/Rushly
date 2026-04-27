package com.productservice.productservice.controller;

import com.productservice.productservice.model.create.ProductRequestCreate;
import com.productservice.productservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductCreateController {
    @Autowired
    private ProductService service;

    @PostMapping("/create")
    public void createProduct(@RequestBody ProductRequestCreate productRequestCreate) {
        service.saveProduct(productRequestCreate);
    }
}
