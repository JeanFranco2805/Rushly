package com.thefive40.net.userservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_methods")
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType type;

    private String details;

    private boolean isDefault;

    private boolean isActive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PaymentType getType() { return type; }
    public void setType(PaymentType type) { this.type = type; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public Store getStore() { return store; }
    public void setStore(Store store) { this.store = store; }
}