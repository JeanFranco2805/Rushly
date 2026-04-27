package com.productservice.orderservice.controller;

import com.productservice.orderservice.model.OrderDTO;
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
    public void deleteAll(){
        orderService.deleteAll();
    }
    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable Long id){
        orderService.deleteById(id);
    }
    @DeleteMapping("/deleteByUserId/{userId}")
    public void deleteByUserId(@PathVariable Long userId){
        orderService.deleteByUserId(userId);
    }
    @GetMapping("/findById/{id}")
    public OrderDTO findById(@PathVariable Long id){
        return orderService.findById(id);
    }
    @GetMapping("/findByUserId/{userId}")
    public OrderDTO findByUserId(@PathVariable Long userId){
        return orderService.findByUserId(userId);
    }
    @PutMapping("/update")
    public void updateOrder(@RequestBody OrderDTO orderDTO){
        orderService.updateOrder(orderDTO);
    }
}
