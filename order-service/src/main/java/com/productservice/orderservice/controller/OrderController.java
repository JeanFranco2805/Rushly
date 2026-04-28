package com.productservice.orderservice.controller;

import com.productservice.orderservice.model.OrderDTO;
import com.productservice.orderservice.model.OrderItemDTO;
import com.productservice.orderservice.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // ── PEDIDOS ───────────────────────────────────────────────────────────────

    @PostMapping("/save")
    public ResponseEntity<OrderDTO> save(@RequestBody OrderDTO dto) {
        return ResponseEntity.ok(orderService.save(dto));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    /** Todos los pedidos de un usuario */
    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<List<OrderDTO>> findByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.findByUserId(userId));
    }

    /** Todos los pedidos que recibe una tienda */
    @GetMapping("/findByStoreId/{storeId}")
    public ResponseEntity<List<OrderDTO>> findByStoreId(@PathVariable Long storeId) {
        return ResponseEntity.ok(orderService.findByStoreId(storeId));
    }

    /** Pedidos de un usuario filtrados por estado */
    @GetMapping("/findByUserIdAndStatus/{userId}")
    public ResponseEntity<List<OrderDTO>> findByUserIdAndStatus(
            @PathVariable Long userId,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.findByUserIdAndStatus(userId, status));
    }

    /** Pedidos de una tienda filtrados por estado */
    @GetMapping("/findByStoreIdAndStatus/{storeId}")
    public ResponseEntity<List<OrderDTO>> findByStoreIdAndStatus(
            @PathVariable Long storeId,
            @RequestParam String status) {
        return ResponseEntity.ok(orderService.findByStoreIdAndStatus(storeId, status));
    }

    @PutMapping("/update")
    public ResponseEntity<Void> update(@RequestBody OrderDTO dto) {
        orderService.updateOrder(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<Void> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        orderService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updatePrice/{id}")
    public ResponseEntity<Void> updatePrice(
            @PathVariable Long id,
            @RequestParam double price) {
        orderService.updatePrice(id, price);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateTotalAmount/{id}")
    public ResponseEntity<Void> updateTotalAmount(
            @PathVariable Long id,
            @RequestParam double totalAmount) {
        orderService.updateTotalAmount(id, totalAmount);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        orderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public ResponseEntity<Void> deleteByUserId(@PathVariable Long userId) {
        orderService.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteByStoreId/{storeId}")
    public ResponseEntity<Void> deleteByStoreId(@PathVariable Long storeId) {
        orderService.deleteByStoreId(storeId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAll() {
        orderService.deleteAll();
        return ResponseEntity.noContent().build();
    }

    // ── ÍTEMS ─────────────────────────────────────────────────────────────────

    @PostMapping("/saveOrderItem")
    public ResponseEntity<OrderItemDTO> saveOrderItem(@RequestBody OrderItemDTO dto) {
        return ResponseEntity.ok(orderService.saveOrderItem(dto));
    }

    @GetMapping("/orderItems/{orderId}")
    public ResponseEntity<List<OrderItemDTO>> getItemsByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.findOrderItemsByOrderId(orderId));
    }

    @GetMapping("/findAllOrderItems")
    public ResponseEntity<List<OrderItemDTO>> findAllOrderItems() {
        return ResponseEntity.ok(orderService.findAllOrderItems());
    }

    @DeleteMapping("/deleteOrderItem/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
        orderService.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAllOrderItems")
    public ResponseEntity<Void> deleteAllOrderItems() {
        orderService.deleteAllOrderItems();
        return ResponseEntity.noContent().build();
    }
}