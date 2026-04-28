package com.productservice.productservice.controller;

import com.productservice.productservice.model.create.ProductRequestCreate;
import com.productservice.productservice.model.read.ProductResponse;
import com.productservice.productservice.model.update.ProductRequestUpdate;
import com.productservice.productservice.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }


    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ProductRequestCreate dto) {
        service.saveProduct(dto);
        return ResponseEntity.ok("Product created");
    }


    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAll() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getProductById(id));
    }

    @GetMapping("/findByName/{name}")
    public ResponseEntity<List<ProductResponse>> getByName(@PathVariable String name) {
        return ResponseEntity.ok(service.getProductByName(name));
    }

    @GetMapping("/findByCategory/{category}")
    public ResponseEntity<List<ProductResponse>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(service.getProductByCategory(category));
    }



    /** Todos los productos de una tienda (activos + inactivos — para el vendedor) */
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductResponse>> getByStore(@PathVariable Long storeId) {
        return ResponseEntity.ok(service.getProductsByStore(storeId));
    }

    /** Solo productos activos de una tienda (para el cliente) */
    @GetMapping("/store/{storeId}/active")
    public ResponseEntity<List<ProductResponse>> getActiveByStore(@PathVariable Long storeId) {
        return ResponseEntity.ok(service.getActiveProductsByStore(storeId));
    }

    /** Productos con stock bajo (umbral por defecto = 10) */
    @GetMapping("/store/{storeId}/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStock(
            @PathVariable Long storeId,
            @RequestParam(defaultValue = "10") int threshold) {
        return ResponseEntity.ok(service.getLowStockByStore(storeId, threshold));
    }


    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody ProductRequestUpdate dto) {
        service.update(dto);
        return ResponseEntity.ok("Product updated");
    }

    /** Actualizar sólo el stock */
    @PatchMapping("/{id}/stock")
    public ResponseEntity<String> updateStock(
            @PathVariable String id,
            @RequestParam int stock) {
        service.updateStock(id, stock);
        return ResponseEntity.ok("Stock updated");
    }

    /** Decrementar stock (al realizar un pedido) */
    @PatchMapping("/{id}/stock/decrement")
    public ResponseEntity<String> decrementStock(
            @PathVariable String id,
            @RequestParam int quantity) {
        service.decrementStock(id, quantity);
        return ResponseEntity.ok("Stock decremented");
    }

    /** Activar / desactivar producto */
    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<String> toggleActive(@PathVariable String id) {
        service.toggleActive(id);
        return ResponseEntity.ok("Status toggled");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteById(@RequestParam String id) {
        service.deleteProductById(id);
        return ResponseEntity.ok("Product deleted");
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAll() {
        service.deleteAllProducts();
        return ResponseEntity.ok("All products deleted");
    }
}