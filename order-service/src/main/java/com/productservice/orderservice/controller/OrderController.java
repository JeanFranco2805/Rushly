package com.productservice.orderservice.controller;

import com.productservice.orderservice.model.OrderDTO;
import com.productservice.orderservice.model.OrderItemDTO;
import com.productservice.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/save")
    public void saveOrder(@RequestBody OrderDTO orderDTO) {
        orderService.save(orderDTO);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        orderService.deleteAll();
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        orderService.deleteById(id);
    }

    @DeleteMapping("/deleteByUserId/{userId}")
    public void deleteByUserId(@PathVariable Long userId) {
        orderService.deleteByUserId(userId);
    }

    @GetMapping("/findById/{id}")
    public OrderDTO findById(@PathVariable Long id) {
        return orderService.findById(id);
    }

    @GetMapping("/findByUserId/{userId}")
    public OrderDTO findByUserId(@PathVariable Long userId) {
        return orderService.findByUserId(userId);
    }

    @PutMapping("/update")
    public void updateOrder(@RequestBody OrderDTO orderDTO) {
        orderService.updateOrder(orderDTO);
    }

    @PutMapping("/updateStatus/{id}")
    public void updateStatus(@PathVariable Long id, @RequestParam String status) {
        orderService.updateStatus(id, status);
    }

    @PutMapping("/updatePrice/{id}")
    public void updatePrice(@PathVariable Long id, @RequestParam Double price) {
        orderService.updatePrice(id, price);
    }

    @PutMapping("/updateTotalAmount/{id}")
    public void updateTotalAmount(@PathVariable Long id, @RequestParam Double totalAmount) {
        orderService.updateTotalAmount(id, totalAmount);
    }

    @PutMapping("/updateOrderItemPrice/{id}")
    public void updateOrderItemPrice(@PathVariable Long id, @RequestParam Double price) {
        orderService.updateOrderItemPrice(id, price);
    }

    @PostMapping("/saveOrderItem")
    public void saveOrderItem(@RequestBody OrderItemDTO orderItemDTO) {
        orderService.saveOrderItem(orderItemDTO);
    }
    @DeleteMapping("/deleteOrderItem/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderService.deleteOrderItem(id);
    }
    @DeleteMapping("/deleteAllOrderItems")
    public void deleteAllOrderItems() {
        orderService.deleteAllOrderItems();
    }
    @GetMapping("/findAllOrderItems")
    public Iterable<OrderItemDTO> findAllOrderItems() {
        return orderService.findAllOrderItems();
    }
}
