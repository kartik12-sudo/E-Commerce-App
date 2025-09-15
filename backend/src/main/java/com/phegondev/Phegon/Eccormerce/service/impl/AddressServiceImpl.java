package com.phegondev.Phegon.Eccormerce.service.impl;

import com.phegondev.Phegon.Eccormerce.dto.AddressDto;
import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.entity.Address;
import com.phegondev.Phegon.Eccormerce.entity.User;
import com.phegondev.Phegon.Eccormerce.mapper.EntityDtoMapper;
import com.phegondev.Phegon.Eccormerce.repository.AddressRepo;
import com.phegondev.Phegon.Eccormerce.service.interf.AddressService;
import com.phegondev.Phegon.Eccormerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;
    private final EntityDtoMapper mapper;

    @Override
    public Response saveAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();

        Address address = new Address();
        address.setUser(user);
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        return Response.builder()
                .status(200)
                .message("Address successfully created")
                .build();
    }

    @Override
    public Response updateAddress(Long id, AddressDto addressDto) {
        User user = userService.getLoginUser();

        Address address = addressRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to edit this address");
        }

        if (addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if (addressDto.getState() != null) address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        return Response.builder()
                .status(200)
                .message("Address successfully updated")
                .build();
    }

    @Override
    public Response deleteAddress(Long id) {
        User user = userService.getLoginUser();

        Address address = addressRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this address");
        }

        addressRepo.delete(address);

        return Response.builder()
                .status(200)
                .message("Address successfully deleted")
                .build();
    }

    @Override
    public List<AddressDto> getUserAddresses() {
        User user = userService.getLoginUser();

        return addressRepo.findByUserId(user.getId())
                .stream()
                .map(mapper::mapAddressToDtoBasic)
                .collect(Collectors.toList());
    }
}
