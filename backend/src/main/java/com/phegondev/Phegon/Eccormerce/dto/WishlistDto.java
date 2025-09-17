package com.phegondev.Phegon.Eccormerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishlistDto {
    private Long id;             // wishlist row id
    private Long productId;
    private String productName;
    private String productImageUrl;
    private Double productPrice;
}
