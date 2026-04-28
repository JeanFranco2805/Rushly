package com.productservice.orderservice.service;

import com.productservice.orderservice.mapper.OrderMapper;
import com.productservice.orderservice.model.Order;
import com.productservice.orderservice.model.OrderDTO;
import com.productservice.orderservice.model.OrderItem;
import com.productservice.orderservice.model.OrderItemDTO;
import com.productservice.orderservice.repository.OrderItemRepository;
import com.productservice.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        OrderMapper orderMapper) {
        this.orderRepository     = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderMapper         = orderMapper;
    }

    // ── PEDIDOS ───────────────────────────────────────────────────────────────

    public OrderDTO save(OrderDTO dto) {
        Order order = orderMapper.toEntity(dto);
        if (order.getOrderDate() == null) order.setOrderDate(LocalDateTime.now());
        if (order.getStatus() == null)    order.setStatus("PENDING");
        return orderMapper.toDTO(orderRepository.save(order));
    }

    public OrderDTO findById(Long id) {
        return orderMapper.toDTO(
                orderRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Order not found: " + id))
        );
    }

    public List<OrderDTO> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream().map(orderMapper::toDTO).toList();
    }

    public List<OrderDTO> findByStoreId(Long storeId) {
        return orderRepository.findByStoreId(storeId)
                .stream().map(orderMapper::toDTO).toList();
    }

    public List<OrderDTO> findByUserIdAndStatus(Long userId, String status) {
        return orderRepository.findByUserIdAndStatus(userId, status)
                .stream().map(orderMapper::toDTO).toList();
    }

    public List<OrderDTO> findByStoreIdAndStatus(Long storeId, String status) {
        return orderRepository.findByStoreIdAndStatus(storeId, status)
                .stream().map(orderMapper::toDTO).toList();
    }

    public void updateOrder(OrderDTO dto) {
        orderRepository.save(orderMapper.toEntity(dto));
    }

    public void updateStatus(Long id, String status) {
        orderRepository.findById(id).ifPresent(o -> {
            o.setStatus(status);
            orderRepository.save(o);
        });
    }

    public void updatePrice(Long id, double price) {
        orderRepository.findById(id).ifPresent(o -> {
            o.setPrice(price);
            orderRepository.save(o);
        });
    }

    public void updateTotalAmount(Long id, double totalAmount) {
        orderRepository.findById(id).ifPresent(o -> {
            o.setTotalAmount(totalAmount);
            orderRepository.save(o);
        });
    }

    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        orderRepository.deleteByUserId(userId);
    }

    @Transactional
    public void deleteByStoreId(Long storeId) {
        orderRepository.deleteByStoreId(storeId);
    }

    public void deleteAll() {
        orderRepository.deleteAll();
    }

    // ── ÍTEMS DE PEDIDO ───────────────────────────────────────────────────────

    public OrderItemDTO saveOrderItem(OrderItemDTO dto) {
        OrderItem item = orderMapper.toOrderItemEntity(dto);
        if (dto.orderId() != null) {
            orderRepository.findById(dto.orderId()).ifPresent(item::setOrder);
        }
        return orderMapper.toOrderItemDTO(orderItemRepository.save(item));
    }

    public List<OrderItemDTO> findOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId)
                .stream().map(orderMapper::toOrderItemDTO).toList();
    }

    public List<OrderItemDTO> findAllOrderItems() {
        return orderItemRepository.findAll()
                .stream().map(orderMapper::toOrderItemDTO).toList();
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }

    @Transactional
    public void deleteOrderItemsByOrderId(Long orderId) {
        orderItemRepository.deleteByOrderId(orderId);
    }

    public void deleteAllOrderItems() {
        orderItemRepository.deleteAll();
    }
}