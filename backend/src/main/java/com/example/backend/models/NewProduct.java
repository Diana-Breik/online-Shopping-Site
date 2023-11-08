package com.example.backend.models;

public record NewProduct(String name,
                         double price,
                         String imageUrl,
                         String description,
                         ProductCategory category
) {
}
