package com.thefive40.net.userservice.model;

public record AddressDTO(
        String street,
        String number,
        String city,
        String state,
        String country,
        String zipCode,
        String complement
) {
    @Override
    public String street() {
        return street;
    }

    @Override
    public String number() {
        return number;
    }

    @Override
    public String city() {
        return city;
    }

    @Override
    public String state() {
        return state;
    }

    @Override
    public String country() {
        return country;
    }

    @Override
    public String zipCode() {
        return zipCode;
    }

    @Override
    public String complement() {
        return complement;
    }
}
