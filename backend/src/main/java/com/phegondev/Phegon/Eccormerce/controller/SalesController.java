package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.entity.Product;
import com.phegondev.Phegon.Eccormerce.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SalesController {

    private final ProductRepo productRepo;
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/best-sellers")
    public ResponseEntity<?> getBestSellers() {
        try {
            String url = "http://localhost:5000/best-sellers"; // FastAPI service
            Map<String, List<Map<String, Object>>> response =
                    restTemplate.getForObject(url, Map.class);

            List<Product> products = new ArrayList<>();

            if (response != null) {
                for (List<Map<String, Object>> items : response.values()) {
                    for (Map<String, Object> item : items) {
                        String productName = (String) item.get("Product");

                        // 🔹 Split product name into words and search loosely
                        String[] keywords = productName.split(" ");
                        for (String keyword : keywords) {
                            if (keyword.length() > 2) { // skip very short words
                                List<Product> matches = productRepo.searchByKeyword(keyword);
                                products.addAll(matches);
                            }
                        }
                    }
                }
            }

            // 🔹 Remove duplicates by product ID
            List<Product> distinctProducts = products.stream()
                    .distinct()
                    .toList();

            return ResponseEntity.ok(distinctProducts);
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Error fetching best sellers: " + e.getMessage());
        }
    }
}
