package com.productservice.notificationservice.service;

import com.productservice.notificationservice.mapper.NotificationMapper;
import com.productservice.notificationservice.model.NotificationDTO;
import com.productservice.notificationservice.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationService(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    public void createNotification(String message) {
        var notification = notificationMapper.toEntity(new com.productservice.notificationservice.model.NotificationDTO(
                null,
                message,
                "INFO",
                0L,
                java.time.LocalDateTime.now()
        ));
        notificationRepository.save(notification);
    }
    public Iterable<com.productservice.notificationservice.model.NotificationDTO> findAllNotifications() {
        return notificationRepository.findAll().stream().map(notificationMapper::toDTO).toList();
    }
    public void deleteAllNotifications() {
        notificationRepository.deleteAll();
    }
    public void deleteNotificationById(Long id) {
        notificationRepository.deleteById(id);
    }

    public void deleteNotificationsByUserId(Long userId) {
        notificationRepository.deleteByUserId(userId);
        notificationRepository.flush();
    }
    public void createNotificationForUser(Long userId, String message) {
        var notification = notificationMapper.toEntity(new com.productservice.notificationservice.model.NotificationDTO(
                null,
                message,
                "INFO",
                userId,
                java.time.LocalDateTime.now()
        ));
        notificationRepository.save(notification);
    }
    public void markNotificationAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(notification -> notification.setRead(true));
    }
    public void createNotification(String message, String type) {
        var notification = notificationMapper.toEntity(new com.productservice.notificationservice.model.NotificationDTO(
                null,
                message,
                type,
                0L,
                java.time.LocalDateTime.now()
        ));
        notificationRepository.save(notification);
    }
    public NotificationDTO findByUserId(Long userId){
        return notificationMapper.toDTO(notificationRepository.findByUserId(userId));
    }

    public List<NotificationDTO> findAllByUserId(Long userIds){
        return notificationRepository.findAllByUserId(userIds).stream().map(notificationMapper::toDTO).toList();
    }

    public void createNotification(String message, String type, Long userId) {
        var notification = notificationMapper.toEntity(new com.productservice.notificationservice.model.NotificationDTO(
                null,
                message,
                type,
                userId,
                java.time.LocalDateTime.now()
        ));
    }
}
