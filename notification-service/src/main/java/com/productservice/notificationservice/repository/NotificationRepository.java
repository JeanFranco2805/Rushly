package com.productservice.notificationservice.repository;

import com.productservice.notificationservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Notification findByUserId(Long userId);
    void deleteByUserId(Long userId);
    List<Notification> findAllByUserId(Long userId);
}
