package com.productservice.notificationservice.controller;

import com.productservice.notificationservice.model.NotificationDTO;
import com.productservice.notificationservice.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/send/{message}")
    public ResponseEntity<String> sendNotification(@PathVariable String message) {
        notificationService.createNotification(message);
        return ResponseEntity.ok("Notification sent");
    }

    @PostMapping("/sendByUser/{userId}/{message}")
    public ResponseEntity<String> createNotificationByUser(@PathVariable Long userId, @PathVariable String message) {
        notificationService.createNotificationForUser(userId, message);
        return ResponseEntity.ok("Notification sent to user " + userId);
    }

    @PostMapping("/sendBy/{userId}/{message}/{type}")
    public ResponseEntity<String> createNotificationByType(@PathVariable Long userId, @PathVariable String message, @PathVariable String type) {
        notificationService.createNotification(message, type, userId);
        return ResponseEntity.ok("Notification sent to user " + userId);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Iterable<NotificationDTO>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.findAllNotifications());
    }
    @GetMapping("/getByUser/{userId}")
    public ResponseEntity<NotificationDTO> getNotificationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationService.findByUserId(userId));
    }
    @GetMapping("/getAllByUserId/{userId}")
    public List<NotificationDTO> getAllNotificationsByUserId(@PathVariable Long userId) {
        return notificationService.findAllByUserId(userId);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAllNotifications() {
        notificationService.deleteAllNotifications();
        return ResponseEntity.ok("All notifications deleted");
    }
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteNotificationById(@PathVariable Long id) {
        notificationService.deleteNotificationById(id);
        return ResponseEntity.ok("Notification deleted");
    }

}
