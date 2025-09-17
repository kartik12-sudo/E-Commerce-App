package com.phegondev.Phegon.Eccormerce.service.impl;

import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.dto.WishlistDto;
import com.phegondev.Phegon.Eccormerce.entity.Product;
import com.phegondev.Phegon.Eccormerce.entity.User;
import com.phegondev.Phegon.Eccormerce.entity.Wishlist;
import com.phegondev.Phegon.Eccormerce.exception.NotFoundException;
import com.phegondev.Phegon.Eccormerce.repository.ProductRepo;
import com.phegondev.Phegon.Eccormerce.repository.WishlistRepo;
import com.phegondev.Phegon.Eccormerce.service.interf.UserService;
import com.phegondev.Phegon.Eccormerce.service.interf.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

        private final WishlistRepo wishlistRepo;
        private final ProductRepo productRepo;
        private final UserService userService;

        @Override
        public Response addToWishlist(Long productId) {
                User user = userService.getLoginUser();
                Product product = productRepo.findById(productId)
                                .orElseThrow(() -> new NotFoundException("Product not found"));

                if (wishlistRepo.existsByUserAndProduct(user, product)) {
                        return Response.builder()
                                        .status(400)
                                        .message("Product already in wishlist")
                                        .build();
                }

                Wishlist wishlist = Wishlist.builder()
                                .user(user)
                                .product(product)
                                .build();
                wishlistRepo.save(wishlist);

                return Response.builder()
                                .status(200)
                                .message("Product added to wishlist")
                                .build();
        }

        @Override
        @Transactional
        public Response removeFromWishlist(Long productId) {
                User user = userService.getLoginUser();
                Product product = productRepo.findById(productId)
                                .orElseThrow(() -> new NotFoundException("Product not found"));

                wishlistRepo.deleteByUserAndProduct(user, product);

                return Response.builder()
                                .status(200)
                                .message("Product removed from wishlist")
                                .build();
        }

        @Override
        public Response getMyWishlist() {
                User user = userService.getLoginUser();
                List<Wishlist> wishlistItems = wishlistRepo.findByUser(user);

                List<WishlistDto> products = wishlistItems.stream()
                                .map(item -> WishlistDto.builder()
                                                .id(item.getId())
                                                .productId(item.getProduct().getId())
                                                .productName(item.getProduct().getName())
                                                .productImageUrl(item.getProduct().getImageUrl())
                                                .productPrice(item.getProduct().getPrice().doubleValue())
                                                .build())
                                .collect(Collectors.toList());

                return Response.builder()
                                .status(200)
                                .message("Wishlist fetched successfully")
                                .wishlistList(products)
                                .build();
        }

}
