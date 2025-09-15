package com.phegondev.Phegon.Eccormerce.mapper;

import com.phegondev.Phegon.Eccormerce.dto.*;
import com.phegondev.Phegon.Eccormerce.entity.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {

    // ✅ User entity → User DTO (basic)
    public UserDto mapUserToDtoBasic(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setName(user.getName());
        return userDto;
    }

    // ✅ Address entity → Address DTO (basic)
    public AddressDto mapAddressToDtoBasic(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setCity(address.getCity());
        addressDto.setStreet(address.getStreet());
        addressDto.setState(address.getState());
        addressDto.setCountry(address.getCountry());
        addressDto.setZipCode(address.getZipCode());
        addressDto.setCreatedAt(address.getCreatedAt());
        return addressDto;
    }

    // ✅ Category entity → Category DTO
    public CategoryDto mapCategoryToDtoBasic(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }

    // ✅ OrderItem entity → OrderItem DTO (basic)
    public OrderItemDto mapOrderItemToDtoBasic(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setStatus(orderItem.getStatus().name());
        orderItemDto.setCreatedAt(orderItem.getCreatedAt());
        return orderItemDto;
    }

    // ✅ Product entity → Product DTO
    public ProductDto mapProductToDtoBasic(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImageUrl(product.getImageUrl());

        if (product.getCategory() != null) {
            productDto.setCategory(mapCategoryToDtoBasic(product.getCategory()));
        }
        return productDto;
    }

    // ✅ User with addresses
    public UserDto mapUserToDtoPlusAddresses(User user) {
        UserDto userDto = mapUserToDtoBasic(user);

        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            List<AddressDto> addressDtos = user.getAddresses()
                    .stream()
                    .map(this::mapAddressToDtoBasic)
                    .collect(Collectors.toList());
            userDto.setAddresses(addressDtos);
        }
        return userDto;
    }

    // ✅ OrderItem + Product
    public OrderItemDto mapOrderItemToDtoPlusProduct(OrderItem orderItem) {
        OrderItemDto orderItemDto = mapOrderItemToDtoBasic(orderItem);

        if (orderItem.getProduct() != null) {
            ProductDto productDto = mapProductToDtoBasic(orderItem.getProduct());
            orderItemDto.setProduct(productDto);
        }
        return orderItemDto;
    }

    // ✅ OrderItem + Product + User
    public OrderItemDto mapOrderItemToDtoPlusProductAndUser(OrderItem orderItem) {
        OrderItemDto orderItemDto = mapOrderItemToDtoPlusProduct(orderItem);

        if (orderItem.getUser() != null) {
            UserDto userDto = mapUserToDtoPlusAddresses(orderItem.getUser());
            orderItemDto.setUser(userDto);
        }
        return orderItemDto;
    }

    // ✅ User + Addresses + Order History
    public UserDto mapUserToDtoPlusAddressesAndOrderHistory(User user) {
        UserDto userDto = mapUserToDtoPlusAddresses(user);

        if (user.getOrderItemList() != null && !user.getOrderItemList().isEmpty()) {
            userDto.setOrderItemList(user.getOrderItemList()
                    .stream()
                    .map(this::mapOrderItemToDtoPlusProduct)
                    .collect(Collectors.toList()));
        }
        return userDto;
    }

    // ✅ Order entity → Order DTO
    public OrderDto mapOrderToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setCreatedAt(order.getCreatedAt());

        if (order.getOrderItemList() != null) {
            dto.setOrderItemList(
                    order.getOrderItemList().stream()
                            .map(this::mapOrderItemToDtoPlusProductAndUser)
                            .collect(Collectors.toList()));
        }
        return dto;
    }
}
