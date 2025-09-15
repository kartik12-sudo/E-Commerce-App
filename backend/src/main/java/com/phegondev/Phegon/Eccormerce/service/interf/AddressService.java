package com.phegondev.Phegon.Eccormerce.service.interf;

import com.phegondev.Phegon.Eccormerce.dto.AddressDto;
import com.phegondev.Phegon.Eccormerce.dto.Response;

import java.util.List;

public interface AddressService {
    Response saveAddress(AddressDto addressDto);
    Response updateAddress(Long id, AddressDto addressDto);
    Response deleteAddress(Long id);
    List<AddressDto> getUserAddresses();
}
