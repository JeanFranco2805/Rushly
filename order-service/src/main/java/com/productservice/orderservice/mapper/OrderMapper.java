package com.productservice.orderservice.mapper;

import com.productservice.orderservice.model.Order;
import com.productservice.orderservice.model.OrderDTO;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderDTO toDTO(Order order) {
        return new OrderDTO(
                order.getId(),
                order.getUserId(),
                order.getTotalAmount(),
                order.getPrice(),
                order.getStatus(),
                order.getOrderDate()
        );
    }

    public Order toEntity(OrderDTO orderDTO) {
        Order order = new Order();
        order.setId(orderDTO.id());
        order.setUserId(orderDTO.userId());
        order.setTotalAmount(orderDTO.totalAmount());
        order.setPrice(orderDTO.price());
        order.setStatus(orderDTO.status());
        order.setOrderDate(orderDTO.orderDate());
        return order;
    }
}
