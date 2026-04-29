package com.thefive40.net.userservice.service;

import com.thefive40.net.userservice.mapper.AddressMapper;
import com.thefive40.net.userservice.mapper.UserMapper;
import com.thefive40.net.userservice.model.AddressDTO;
import com.thefive40.net.userservice.model.User;
import com.thefive40.net.userservice.model.UserDTO;
import com.thefive40.net.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private UserMapper mapper;

    public void createUser() {
        repository.save(new User());
    }

    public UserDTO findById(Long id) {
        var user = repository.findById(id).orElseThrow();
        AddressDTO addressDTO = user.getAddress() != null
                ? addressMapper.toDTO(user.getAddress())
                : null;
        return mapper.toDTO(user.getName(), user.getEmail(), user.getPassword(), user.getPhone(), addressDTO);
    }

    public AddressDTO findAddressById(Long id) {
        var user = repository.findById(id).orElseThrow();
        if (user.getAddress() == null) return null;
        return addressMapper.toDTO(user.getAddress());
    }

    public void createUser(UserDTO userDTO) {
        repository.save(mapper.toEntity(userDTO));
    }

    public void createAllUsers(List<UserDTO> usersDTO) {
        repository.saveAll(mapper.toEntityList(usersDTO));
    }

    public void deleteUserById(Long id) {
        repository.deleteById(id);
    }

    public void updateUser(UserDTO userDTO) {
        repository.save(mapper.toEntity(userDTO));
    }

    public void deleteAllUsers() {
        repository.deleteAll();
    }
}