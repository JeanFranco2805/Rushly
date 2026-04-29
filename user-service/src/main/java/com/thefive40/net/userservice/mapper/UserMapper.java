package com.thefive40.net.userservice.mapper;

import com.thefive40.net.userservice.model.AddressDTO;
import com.thefive40.net.userservice.model.User;
import com.thefive40.net.userservice.model.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMapper {

    private final AddressMapper addressMapper;

    public UserMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    public UserDTO toDTO(String name, String email, String password, String phone, AddressDTO addressDTO) {
        return new UserDTO(name, email, password, phone, addressDTO);
    }

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setPhone(userDTO.getPhone());
        if (userDTO.getAddress() != null) {
            user.setAddress(addressMapper.toEntity(userDTO.getAddress()));
        }
        return user;
    }

    public List<UserDTO> toDTOList(List<User> users) {
        return users.stream()
                .map(user -> new UserDTO(
                        user.getName(),
                        user.getEmail(),
                        user.getPassword(),
                        user.getPhone(),
                        user.getAddress() != null ? addressMapper.toDTO(user.getAddress()) : null
                ))
                .toList();
    }

    public List<User> toEntityList(List<UserDTO> usersDTO) {
        return usersDTO.stream()
                .map(this::toEntity)
                .toList();
    }
}