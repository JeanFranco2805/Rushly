package com.thefive40.net.userservice.controller;

import com.thefive40.net.userservice.model.AddressDTO;
import com.thefive40.net.userservice.model.UserDTO;
import com.thefive40.net.userservice.service.AddressService;
import com.thefive40.net.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;
    @Autowired
    private AddressService addressService;

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO) {
        service.createUser(userDTO);
        return ResponseEntity.ok("User created successfully");
    }

    @PostMapping("/createAlls")
    public ResponseEntity<String> createAllUsers(UserDTO... userDTO) {
        for (UserDTO user : userDTO) {
            service.createUser(user);
        }
        return ResponseEntity.ok("Users created successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        service.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateUser(@RequestBody UserDTO userDTO) {
        service.updateUser(userDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllUsers() {
        service.deleteAllUsers();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable Long id) {
        var userByid = service.findById(id);
        return ResponseEntity.ok(userByid);
    }

    @GetMapping("/findAddress/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.findById(id));
    }

    @GetMapping("/findAddressByUserId/{id}")
    public ResponseEntity<AddressDTO> getAddressByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findAddressById(id));
    }

    @PostMapping("/createAddress/{userId}")
    public ResponseEntity<String> createAddress(@RequestBody AddressDTO addressDTO, @PathVariable Long userId) {
        addressService.createAddress(addressDTO, userId);
        return ResponseEntity.ok("Address created successfully");
    }

    @PutMapping("/updateAddress")
    public ResponseEntity<String> updateAddress(@RequestBody AddressDTO addressDTO) {
        addressService.updateAddress(addressDTO);
        return ResponseEntity.ok("Address updated successfully");
    }
    @DeleteMapping("/deleteAddress/{id}")
    public ResponseEntity<Void> deleteAddressById(@PathVariable Long id) {
        addressService.deleteAddressById(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/deleteAllAddresses")
    public ResponseEntity<Void> deleteAllAddresses() {
        addressService.deleteAllAddresses();
        return ResponseEntity.ok().build();
    }

}
