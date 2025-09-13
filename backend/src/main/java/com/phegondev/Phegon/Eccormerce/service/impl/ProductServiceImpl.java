package com.phegondev.Phegon.Eccormerce.service.impl;

import com.phegondev.Phegon.Eccormerce.dto.ProductDto;
import com.phegondev.Phegon.Eccormerce.dto.Response;
import com.phegondev.Phegon.Eccormerce.entity.Category;
import com.phegondev.Phegon.Eccormerce.entity.Product;
import com.phegondev.Phegon.Eccormerce.exception.NotFoundException;
import com.phegondev.Phegon.Eccormerce.mapper.EntityDtoMapper;
import com.phegondev.Phegon.Eccormerce.repository.CategoryRepo;
import com.phegondev.Phegon.Eccormerce.repository.ProductRepo;
import com.phegondev.Phegon.Eccormerce.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response createProduct(Long categoryId, String imageUrl, String name, String description, BigDecimal price) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("Category not found"));

        Product product = new Product();
        product.setCategory(category);
        product.setPrice(price);
        product.setName(name);
        product.setDescription(description);
        product.setImageUrl(imageUrl);

        Product savedProduct = productRepo.save(product);
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(savedProduct);

        return Response.builder()
                .status(200)
                .message("Product successfully created")
                .product(productDto)
                .build();
    }

    @Override
    public Response updateProduct(Long productId, Long categoryId, String imageUrl, String name, String description, BigDecimal price) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));

        if (categoryId != null) {
            Category category = categoryRepo.findById(categoryId)
                    .orElseThrow(() -> new NotFoundException("Category not found"));
            product.setCategory(category);
        }
        if (name != null) product.setName(name);
        if (price != null) product.setPrice(price);
        if (description != null) product.setDescription(description);
        if (imageUrl != null) product.setImageUrl(imageUrl);

        Product updatedProduct = productRepo.save(product);
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(updatedProduct);

        return Response.builder()
                .status(200)
                .message("Product updated successfully")
                .product(productDto)
                .build();
    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));
        productRepo.delete(product);

        return Response.builder()
                .status(200)
                .message("Product deleted successfully")
                .build();
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product Not Found"));
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);

        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productList)
                .build();
    }

    @Override
    public Response getProductsByCategory(Long categoryId) {
        List<Product> products = productRepo.findByCategoryId(categoryId);
        if (products.isEmpty()) {
            throw new NotFoundException("No Products found for this category");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    @Override
    public Response searchProduct(String searchValue) {
        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (products.isEmpty()) {
            throw new NotFoundException("No Products Found");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }
}
