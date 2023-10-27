package com.example.backend.models;

import lombok.With;

public record Product(
        String id,
        @With
        String name,
        @With
        double price
) {
}
