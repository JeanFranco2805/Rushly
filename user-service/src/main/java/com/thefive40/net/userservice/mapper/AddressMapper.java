package com.thefive40.net.userservice.mapper;

import com.thefive40.net.userservice.model.Address;
import com.thefive40.net.userservice.model.AddressDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AddressMapper {
    public AddressDTO toDTO(Address address) {
        return new AddressDTO(address.getStreet(), address.getNumber(), address.getCity(), address.getState(), address.getCountry(), address.getZipCode(), address.getComplement());
    }
    public Address toEntity(AddressDTO addressDTO){
        return new Address(){{
            setStreet(addressDTO.street());
            setNumber(addressDTO.number());
            setCity(addressDTO.city());
            setState(addressDTO.state());
            setCountry(addressDTO.country());
            setZipCode(addressDTO.zipCode());
            setComplement(addressDTO.complement());
        }};
    }
    public List<AddressDTO> toDTOList(List<Address> addresses) {
        return addresses.stream()
                .map(this::toDTO)
                .toList();
    }
    public List<Address> toEntityList(List<AddressDTO> addressesDTO) {
        return addressesDTO.stream()
                .map(this::toEntity)
                .toList();
    }
}
