package com.phegondev.Phegon.Eccormerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/sales")
public class SalesController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/best-sellers")
    public ResponseEntity<?> getBestSellers() {
        // This will call your Python FastAPI service
        String url = "http://localhost:5000/best-sellers";
        Object response = restTemplate.getForObject(url, Object.class);
        return ResponseEntity.ok(response);
    }
}
