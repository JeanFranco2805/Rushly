package com.thefive40.net.userservice.repository;

import com.thefive40.net.userservice.model.Store;
import com.thefive40.net.userservice.model.StoreCategory;
import com.thefive40.net.userservice.model.StoreStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByOwnerId(Long ownerId);

    List<Store> findByCategory(StoreCategory category);

    List<Store> findByStatus(StoreStatus status);

    List<Store> findByCategoryAndStatus(StoreCategory category, StoreStatus status);

    List<Store> findByIsOpenTrue();

    List<Store> findByCityAndStatus(String city, StoreStatus status);

    Optional<Store> findByNameIgnoreCase(String name);
}