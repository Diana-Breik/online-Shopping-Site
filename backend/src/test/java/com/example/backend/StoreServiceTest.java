package com.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class StoreServiceTest {
    private StoreService storeService;
    private StoreRepository storeRepository;

    @BeforeEach
    void setUp() {
        storeRepository = mock(StoreRepository.class);
        storeService = new StoreService(storeRepository);
    }

    @Test
    void whenGetAllProducts_callsEmptyRepo_ThenReturnEmptyList() {
        // Given
        when(storeRepository.findAll()).thenReturn(List.of());

        // When
        List<Product> actual = storeService.getAllProducts();

        // Then
        verify(storeRepository).findAll();

        List<Product> expected = List.of();
        assertEquals(expected, actual);
    }

    @Test
    void whenGetAllProducts_callsNonEmptyRepo_ThenReturnListOfProducts() {
        // Given
        when(storeRepository.findAll()).thenReturn(List.of(
                new Product("1", "Product1", 600.10),
                new Product("2", "Product2", 600.20),
                new Product("3", "Product3", 600.30)
        ));

        // When
       List<Product> actual = storeService.getAllProducts();

        // Then
        verify(storeRepository).findAll();

        List<Product> expected = List.of(
                new Product("1", "Product1", 600.10),
                new Product("2", "Product2", 600.20),
                new Product("3", "Product3", 600.30)
                );
        assertEquals(expected, actual);
    }

}
