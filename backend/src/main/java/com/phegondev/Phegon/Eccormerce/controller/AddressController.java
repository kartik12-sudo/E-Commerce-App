package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.dto.AddressDto;
import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.service.interf.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveAddress(@RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(addressService.saveAddress(addressDto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateAddress(@PathVariable Long id,
                                                  @RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(addressService.updateAddress(id, addressDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteAddress(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.deleteAddress(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<AddressDto>> getUserAddresses() {
        return ResponseEntity.ok(addressService.getUserAddresses());
    }
}
