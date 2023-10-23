package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StoreIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StoreRepository storeRepository;

    @Test
    @DirtiesContext
    void whenGetAllProducts_performsOnEmptyRepo_ThenReturnsEmptyJsonArray() throws Exception {
        // Given

        // When
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/products")
                )

                // Then
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void whenGetAllProducts_performsOnNonEmptyRepo_ThenReturnsJsonArrayWithAllProducts() throws Exception {
        // Given
        Product product1= new Product("1","Product1",1000.10);
        Product product2= new Product("2","Product2",1000.20);
        Product product3= new Product("3","Product3",1000.30);
        storeRepository.save(product1);
        storeRepository.save(product2);
        storeRepository.save(product3);
        // When
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/products")
                )

                // Then
                .andExpect(status().isOk())
                .andExpect(content().json("""
                   [
                   {"id": "1","name": "Product1","price":1000.10 },
                   {"id": "2","name": "Product2","price":1000.20 },
                   {"id": "3","name": "Product3","price":1000.30 }
                   ]
                  
         """));
    }

}
