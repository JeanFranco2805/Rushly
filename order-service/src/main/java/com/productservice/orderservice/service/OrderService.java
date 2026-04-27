package com.productservice.orderservice.service;

import com.productservice.orderservice.mapper.OrderMapper;
import com.productservice.orderservice.model.OrderDTO;
import com.productservice.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    public void save(OrderDTO orderDTO) {
        orderRepository.save(orderMapper.toEntity(orderDTO));
    }

    public void deleteAll(){
        orderRepository.deleteAll();
    }

    public void deleteById(Long id){
        orderRepository.deleteById(id);
    }

    public void deleteByUserId(Long userId){
        orderRepository.deleteAll(orderRepository.findAll().stream().filter(order -> order.getUserId().equals(userId)).toList());
    }

    public OrderDTO findById(Long id){
        return orderMapper.toDTO(orderRepository.findById(id).orElseThrow());
    }

    public OrderDTO findByUserId(Long userId){
        return orderMapper.toDTO(orderRepository.findAll().stream().filter(order -> order.getUserId().equals(userId)).findFirst().orElseThrow());
    }

    public void updateOrder(OrderDTO orderDTO){
        orderRepository.save(orderMapper.toEntity(orderDTO));
    }

    public void updateStatus(Long id, String status){
        orderRepository.findById(id).ifPresent(order -> order.setStatus(status));
    }

    public void updatePrice(Long id, Double price){
        orderRepository.findById(id).ifPresent(order -> order.setPrice(price));
    }

    public void updateTotalAmount(Long id, Double totalAmount){
        orderRepository.findById(id).ifPresent(order -> order.setTotalAmount(totalAmount));
    }



}
