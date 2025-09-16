package com.phegondev.Phegon.Eccormerce.service.impl;

import com.phegondev.Phegon.Eccormerce.dto.ReviewRequest;
import com.phegondev.Phegon.Eccormerce.dto.ReviewResponse;
import com.phegondev.Phegon.Eccormerce.entity.Product;
import com.phegondev.Phegon.Eccormerce.entity.Review;
import com.phegondev.Phegon.Eccormerce.entity.User;
import com.phegondev.Phegon.Eccormerce.repository.ProductRepo;
import com.phegondev.Phegon.Eccormerce.repository.ReviewRepository;
import com.phegondev.Phegon.Eccormerce.service.interf.ReviewService;
import com.phegondev.Phegon.Eccormerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepo;
    private final ProductRepo productRepo;
    private final UserService userService; // ✅ use existing login user helper

    @Override
    public ReviewResponse createReview(ReviewRequest request) {
        // 1. Get currently logged in user
        User user = userService.getLoginUser();

        // 2. Find product
        Product product = productRepo.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 3. Check if review already exists
        if (reviewRepo.existsByProductIdAndUserId(product.getId(), user.getId())) {
            throw new RuntimeException("You have already reviewed this product");
        }

        // 4. Build review
        Review review = Review.builder()
                .content(request.getContent())
                .rating(request.getRating())
                .product(product)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        Review saved = reviewRepo.save(review);

        // 5. Map to response
        ReviewResponse resp = new ReviewResponse();
        resp.setId(saved.getId());
        resp.setContent(saved.getContent());
        resp.setRating(saved.getRating());
        resp.setUsername(user.getName());
        resp.setCreatedAt(saved.getCreatedAt());
        return resp;
    }

    @Override
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
        return reviewRepo.findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(r -> {
                    ReviewResponse resp = new ReviewResponse();
                    resp.setId(r.getId());
                    resp.setContent(r.getContent());
                    resp.setRating(r.getRating());
                    resp.setUsername(r.getUser().getName());
                    resp.setCreatedAt(r.getCreatedAt());
                    return resp;
                })
                .collect(Collectors.toList());
    }
}
