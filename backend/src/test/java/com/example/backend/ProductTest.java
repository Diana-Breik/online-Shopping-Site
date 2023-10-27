package com.example.backend;

import com.example.backend.models.Product;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProductTest {
    private static Product createProduct() {
        return new Product("1", "laptop1", 999.99);
    }

    @Test
    void testWithName ()
    {
        assertEquals(new Product("1", "laptop", 999.99), createProduct().withName("laptop"));
    }
    @Test
    void testWithPrice ()
    {
        assertEquals(new Product("1", "laptop1", 900.99), createProduct().withPrice(900.99));
    }


}
