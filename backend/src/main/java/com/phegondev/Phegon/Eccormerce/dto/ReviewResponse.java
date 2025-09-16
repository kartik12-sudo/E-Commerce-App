package com.phegondev.Phegon.Eccormerce.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private String content;
    private int rating;
    private String username;
    private LocalDateTime createdAt;
}
