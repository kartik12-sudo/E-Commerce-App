package com.phegondev.Phegon.Eccormerce.service.interf;

import com.phegondev.Phegon.Eccormerce.dto.ReviewRequest;
import com.phegondev.Phegon.Eccormerce.dto.ReviewResponse;

import java.util.List;

public interface ReviewService {
    ReviewResponse createReview(ReviewRequest request);
    List<ReviewResponse> getReviewsByProduct(Long productId);
}
