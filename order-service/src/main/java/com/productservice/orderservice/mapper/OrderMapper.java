package com.productservice.orderservice.mapper;

import com.productservice.orderservice.model.Order;
import com.productservice.orderservice.model.OrderDTO;
import com.productservice.orderservice.model.OrderItem;
import com.productservice.orderservice.model.OrderItemDTO;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderDTO toDTO(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getUserId(),
                order.getStoreId(),
                order.getTotalAmount(),
                order.getPrice(),
                order.getStatus(),
                order.getOrderDate(),
                order.getPaymentMethod()
        );
    }

    public Order toEntity(OrderDTO dto) {
        Order order = new Order();
        order.setId(dto.id());
        order.setUserId(dto.userId());
        order.setStoreId(dto.storeId());
        order.setTotalAmount(dto.totalAmount());
        order.setPrice(dto.price());
        order.setStatus(dto.status());
        order.setOrderDate(dto.orderDate());
        order.setPaymentMethod(dto.paymentMethod());
        return order;
    }

    public OrderItemDTO toOrderItemDTO(OrderItem item) {
        return new OrderItemDTO(
                item.getId(),
                item.getProductId(),
                item.getQuantity(),
                item.getPrice(),
                item.getOrder() != null ? item.getOrder().getId() : null
        );
    }

    public OrderItem toOrderItemEntity(OrderItemDTO dto) {
        OrderItem item = new OrderItem();
        item.setId(dto.id());
        item.setProductId(dto.productId());
        item.setQuantity(dto.quantity());
        item.setPrice(dto.price());
        return item;
    }
}