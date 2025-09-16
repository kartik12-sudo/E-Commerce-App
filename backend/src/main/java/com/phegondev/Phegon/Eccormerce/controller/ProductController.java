package com.phegondev.Phegon.Eccormerce.controller;

import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.exception.InvalidCredentialsException;
import com.phegondev.Phegon.Eccormerce.service.AwsS3Service;
import com.phegondev.Phegon.Eccormerce.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final AwsS3Service awsS3Service;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createProduct(
            @RequestParam Long categoryId,
            @RequestParam MultipartFile image,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam BigDecimal price
    ) throws IOException {
        if (categoryId == null || image.isEmpty() || name.isEmpty() || description.isEmpty() || price == null) {
            throw new InvalidCredentialsException("All fields are required");
        }

        String imageUrl = awsS3Service.uploadFile(image);

        return ResponseEntity.ok(
                productService.createProduct(categoryId, imageUrl, name, description, price)
        );
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateProduct(
            @RequestParam Long productId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) BigDecimal price
    ) throws IOException {
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = awsS3Service.uploadFile(image);
        }

        return ResponseEntity.ok(
                productService.updateProduct(productId, categoryId, imageUrl, name, description, price)
        );
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteProduct(@PathVariable Long productId) {
        try {
            return ResponseEntity.ok(productService.deleteProduct(productId));
        } catch (DataIntegrityViolationException e) {
            Response errorResponse = new Response();
            errorResponse.setStatus(400);
            errorResponse.setMessage("Cannot delete product because it is linked to existing orders.");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/get-by-product-id/{productId}")
    public ResponseEntity<Response> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/get-by-category-id/{categoryId}")
    public ResponseEntity<Response> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    // ✅ Renamed param "query" for clarity
    @GetMapping("/search")
    public ResponseEntity<Response> searchForProduct(@RequestParam("query") String query) {
        return ResponseEntity.ok(productService.searchProduct(query));
    }
}
