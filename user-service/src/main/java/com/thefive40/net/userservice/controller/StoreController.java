package com.thefive40.net.userservice.controller;

import com.thefive40.net.userservice.model.PaymentMethodDTO;
import com.thefive40.net.userservice.model.StoreDTO;
import com.thefive40.net.userservice.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    // ── STORE ENDPOINTS ───────────────────────────────────────────────────────

    @PostMapping("/create")
    public ResponseEntity<StoreDTO> create(@RequestBody StoreDTO dto) {
        return ResponseEntity.ok(storeService.createStore(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StoreDTO> update(@PathVariable Long id, @RequestBody StoreDTO dto) {
        return ResponseEntity.ok(storeService.updateStore(id, dto));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<StoreDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.findById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<StoreDTO>> findAll() {
        return ResponseEntity.ok(storeService.findAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<StoreDTO>> findAllActive() {
        return ResponseEntity.ok(storeService.findAllActive());
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<StoreDTO>> findByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(storeService.findByOwner(ownerId));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<StoreDTO>> findByCategory(@PathVariable String category) {
        return ResponseEntity.ok(storeService.findByCategory(category));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        storeService.deleteStore(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/toggle/{id}")
    public ResponseEntity<StoreDTO> toggleOpen(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.toggleOpen(id));
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<StoreDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(storeService.updateStatus(id, status));
    }

    // ── PAYMENT METHOD ENDPOINTS ──────────────────────────────────────────────

    @PostMapping("/{storeId}/payment-methods")
    public ResponseEntity<PaymentMethodDTO> addPaymentMethod(
            @PathVariable Long storeId,
            @RequestBody PaymentMethodDTO dto) {
        return ResponseEntity.ok(storeService.addPaymentMethod(storeId, dto));
    }

    @GetMapping("/{storeId}/payment-methods")
    public ResponseEntity<List<PaymentMethodDTO>> getPaymentMethods(@PathVariable Long storeId) {
        return ResponseEntity.ok(storeService.getPaymentMethods(storeId));
    }

    @DeleteMapping("/payment-methods/{id}")
    public ResponseEntity<Void> deletePaymentMethod(@PathVariable Long id) {
        storeService.deletePaymentMethod(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{storeId}/payment-methods")
    public ResponseEntity<Void> deleteAllPaymentMethods(@PathVariable Long storeId) {
        storeService.deleteAllPaymentMethods(storeId);
        return ResponseEntity.noContent().build();
    }
}