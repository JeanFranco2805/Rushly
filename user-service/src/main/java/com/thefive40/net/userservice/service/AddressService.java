package com.thefive40.net.userservice.service;

import com.thefive40.net.userservice.mapper.AddressMapper;
import com.thefive40.net.userservice.mapper.UserMapper;
import com.thefive40.net.userservice.model.AddressDTO;
import com.thefive40.net.userservice.repository.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final UserService userService;
    private final UserMapper userMapper;
    private final AddressRepository repository;
    private final AddressMapper mapper;

    public AddressService(AddressRepository repository,
                          UserService userService,
                          UserMapper userMapper,
                          AddressMapper mapper) {
        this.repository  = repository;
        this.userService = userService;
        this.userMapper  = userMapper;
        this.mapper      = mapper;
    }

    public void createAddress(AddressDTO addressDTO, Long userId) {
        var address = mapper.toEntity(addressDTO);
        var user    = userMapper.toEntity(userService.findById(userId));
        address.setUser(user);
        user.setAddress(address);
        repository.save(address);
    }

    public void deleteAddressById(Long id) {
        repository.deleteById(id);
    }

    public void updateAddress(AddressDTO addressDTO) {
        repository.save(mapper.toEntity(addressDTO));
    }

    public void deleteAllAddresses() {
        repository.deleteAll();
    }

    public AddressDTO findById(Long id) {
        var address = repository.findById(id).orElseThrow();
        return mapper.toDTO(address);
    }
}