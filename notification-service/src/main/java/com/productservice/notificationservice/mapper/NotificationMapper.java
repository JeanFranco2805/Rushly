package com.productservice.notificationservice.mapper;

import com.productservice.notificationservice.model.Notification;
import com.productservice.notificationservice.model.NotificationDTO;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    public NotificationDTO toDTO(Notification notification) {
        return new NotificationDTO(
                notification.getId(),
                notification.getMessage(),
                notification.getType(),
                notification.getUserId(),
                notification.getCreatedAt()
        );
    }
    public Notification toEntity(NotificationDTO notificationDTO) {
        Notification notification = new Notification();
        notification.setId(notificationDTO.id());
        notification.setMessage(notificationDTO.message());
        notification.setType(notificationDTO.type());
        notification.setUserId(notificationDTO.userId());
        notification.setCreatedAt(notificationDTO.createdAt());
        return notification;
    }

}
