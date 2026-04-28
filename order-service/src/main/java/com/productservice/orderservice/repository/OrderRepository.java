package com.productservice.orderservice.repository;

import com.productservice.orderservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    List<Order> findByStoreId(Long storeId);

    List<Order> findByUserIdAndStatus(Long userId, String status);

    List<Order> findByStoreIdAndStatus(Long storeId, String status);

    void deleteByUserId(Long userId);

    void deleteByStoreId(Long storeId);
}