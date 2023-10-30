package com.example.backend.models;

public record Product(
        String id,
     /*   @With*/
        String name,
     /*   @With*/
        double price
) {
}
