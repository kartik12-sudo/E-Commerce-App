package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.dto.ReviewRequest;
import com.phegondev.Phegon.Eccormerce.dto.ReviewResponse;
import com.phegondev.Phegon.Eccormerce.service.interf.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }
}
