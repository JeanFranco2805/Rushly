package com.thefive40.net.userservice.service;

import com.thefive40.net.userservice.mapper.StoreMapper;
import com.thefive40.net.userservice.model.*;
import com.thefive40.net.userservice.repository.PaymentMethodRepository;
import com.thefive40.net.userservice.repository.StoreRepository;
import com.thefive40.net.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final StoreMapper storeMapper;

    public StoreService(StoreRepository storeRepository,
                        UserRepository userRepository,
                        PaymentMethodRepository paymentMethodRepository,
                        StoreMapper storeMapper) {
        this.storeRepository       = storeRepository;
        this.userRepository        = userRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.storeMapper           = storeMapper;
    }

    // ── STORE CRUD ────────────────────────────────────────────────────────────

    public StoreDTO createStore(StoreDTO dto) {
        User owner = userRepository.findById(dto.ownerId())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.ownerId()));

        Store store = storeMapper.toEntity(dto, owner);
        store.setStatus(StoreStatus.ACTIVE);
        store.setOpen(true);
        store.setCreatedAt(LocalDateTime.now());

        return storeMapper.toDTO(storeRepository.save(store));
    }

    public StoreDTO updateStore(Long id, StoreDTO dto) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found: " + id));

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

        return storeMapper.toDTO(storeRepository.save(store));
    }

    public StoreDTO findById(Long id) {
        return storeMapper.toDTO(
                storeRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Store not found: " + id))
        );
    }

    public List<StoreDTO> findAll() {
        return storeRepository.findAll()
                .stream().map(storeMapper::toDTO).toList();
    }

    public List<StoreDTO> findAllActive() {
        return storeRepository.findByStatus(StoreStatus.ACTIVE)
                .stream().map(storeMapper::toDTO).toList();
    }

    public List<StoreDTO> findByOwner(Long ownerId) {
        return storeRepository.findByOwnerId(ownerId)
                .stream().map(storeMapper::toDTO).toList();
    }

    public List<StoreDTO> findByCategory(String category) {
        return storeRepository
                .findByCategoryAndStatus(StoreCategory.valueOf(category), StoreStatus.ACTIVE)
                .stream().map(storeMapper::toDTO).toList();
    }

    @Transactional
    public void deleteStore(Long id) {
        storeRepository.deleteById(id);
    }

    public StoreDTO toggleOpen(Long id) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found: " + id));
        store.setOpen(!store.isOpen());
        return storeMapper.toDTO(storeRepository.save(store));
    }

    public StoreDTO updateStatus(Long id, String status) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found: " + id));
        store.setStatus(StoreStatus.valueOf(status));
        return storeMapper.toDTO(storeRepository.save(store));
    }

    // ── PAYMENT METHODS ───────────────────────────────────────────────────────

    public PaymentMethodDTO addPaymentMethod(Long storeId, PaymentMethodDTO dto) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found: " + storeId));

        PaymentMethod pm = storeMapper.toPaymentMethodEntity(dto, store);
        pm.setActive(true);

        return storeMapper.toPaymentMethodDTO(paymentMethodRepository.save(pm));
    }

    public List<PaymentMethodDTO> getPaymentMethods(Long storeId) {
        return paymentMethodRepository.findByStoreId(storeId)
                .stream().map(storeMapper::toPaymentMethodDTO).toList();
    }

    public void deletePaymentMethod(Long id) {
        paymentMethodRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllPaymentMethods(Long storeId) {
        paymentMethodRepository.deleteByStoreId(storeId);
    }
}