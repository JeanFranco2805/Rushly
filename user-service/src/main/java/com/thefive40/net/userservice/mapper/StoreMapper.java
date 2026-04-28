package com.thefive40.net.userservice.mapper;

import com.thefive40.net.userservice.model.*;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StoreMapper {

    public StoreDTO toDTO(Store store) {
        List<PaymentMethodDTO> payments = (store.getPaymentMethods() == null)
                ? Collections.emptyList()
                : store.getPaymentMethods().stream()
                .map(this::toPaymentMethodDTO)
                .collect(Collectors.toList());

        return new StoreDTO(
                store.getId(),
                store.getName(),
                store.getDescription(),
                store.getLogoUrl(),
                store.getBannerUrl(),
                store.getPhone(),
                store.getEmail(),
                store.getAddress(),
                store.getCity(),
                store.getCountry(),
                store.getCategory() != null ? store.getCategory().name() : null,
                store.getStatus()   != null ? store.getStatus().name()   : null,
                store.isOpen(),
                store.getOwner()    != null ? store.getOwner().getId()   : null,
                store.getCreatedAt(),
                payments
        );
    }

    public Store toEntity(StoreDTO dto, User owner) {
        Store store = new Store();
        store.setId(dto.id());
        store.setName(dto.name());
        store.setDescription(dto.description());
        store.setLogoUrl(dto.logoUrl());
        store.setBannerUrl(dto.bannerUrl());
        store.setPhone(dto.phone());
        store.setEmail(dto.email());
        store.setAddress(dto.address());
        store.setCity(dto.city());
        store.setCountry(dto.country());
        if (dto.category() != null) store.setCategory(StoreCategory.valueOf(dto.category()));
        if (dto.status()   != null) store.setStatus(StoreStatus.valueOf(dto.status()));
        store.setOpen(dto.isOpen());
        store.setOwner(owner);
        store.setCreatedAt(dto.createdAt());
        return store;
    }

    public PaymentMethodDTO toPaymentMethodDTO(PaymentMethod pm) {
        return new PaymentMethodDTO(
                pm.getId(),
                pm.getType() != null ? pm.getType().name() : null,
                pm.getDetails(),
                pm.isDefault(),
                pm.isActive(),
                pm.getStore() != null ? pm.getStore().getId() : null
        );
    }

    public PaymentMethod toPaymentMethodEntity(PaymentMethodDTO dto, Store store) {
        PaymentMethod pm = new PaymentMethod();
        pm.setId(dto.id());
        if (dto.type() != null) pm.setType(PaymentType.valueOf(dto.type()));
        pm.setDetails(dto.details());
        pm.setDefault(dto.isDefault());
        pm.setActive(dto.isActive());
        pm.setStore(store);
        return pm;
    }
}