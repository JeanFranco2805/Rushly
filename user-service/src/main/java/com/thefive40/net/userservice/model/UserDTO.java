package com.thefive40.net.userservice.model;

public record UserDTO(
        String name,
        String email,
        String password,
        String phone,
        AddressDTO address
) {
    public String getPhone() {
        return phone.replaceAll("\\D+", "");
    }
    public String getPassword() {
        return password;
    }
    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }
    public AddressDTO getAddress() {
        return address;
    }
}
