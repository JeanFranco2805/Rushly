package com.thefive40.net.userservice.repository;

import com.thefive40.net.userservice.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findByStoreId(Long storeId);

    void deleteByStoreId(Long storeId);
}