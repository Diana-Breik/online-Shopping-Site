package com.example.backend.models;

public record Product(
        String id,

        String name,

        double price,

        String imageUrl
) {
}
