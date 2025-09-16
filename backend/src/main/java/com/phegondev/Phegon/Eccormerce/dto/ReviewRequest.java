package com.phegondev.Phegon.Eccormerce.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private String content;
    private int rating;   // 1–10
    private Long productId;
}
