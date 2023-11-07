package com.example.backend;

import com.example.backend.models.Product;
import com.example.backend.models.ProductCategory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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
        Product product1= new Product("1","Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS);
        Product product2= new Product("2","Product2",1000.20, "URL2","Description2", ProductCategory.LAPTOPS);
        Product product3= new Product("3","Product3",1000.30, "URL3","Description3", ProductCategory.LAPTOPS);
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
                   {"id": "1","name": "Product1","price":1000.10,"imageUrl": "URL1","description": "Description1","category": "LAPTOPS" },
                   {"id": "2","name": "Product2","price":1000.20,"imageUrl": "URL2","description": "Description2","category": "LAPTOPS"  },
                   {"id": "3","name": "Product3","price":1000.30,"imageUrl": "URL3","description": "Description3","category": "LAPTOPS" }
                   ]
                  
         """));
    }

    @Test
    @DirtiesContext
    void getProductDetailsByID_ifFound() throws Exception {
        //GIVEN
        String id= "1";
        Product product = new Product(id,"Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS);
        storeRepository.save(product);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/"+ id))

                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
					{
					"id": "1","name": "Product1","price":1000.10,"imageUrl": "URL1","description": "Description1","category": "LAPTOPS"
					}
				"""));
    }

    @Test
    @DirtiesContext
    void getProductByID_ifNotFound_handleNoSuchElementException() throws Exception {
        //GIVEN
        String id= "5";

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/products/"+ id))

                //THEN
                .andExpect(status().isNotFound());
    }
    @Test
    @DirtiesContext
    void whenAddNewProduct_saveAndReturnProductWithRandomID() throws Exception {
        // Given

        // When
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
							{
							"name": "Product1",
							"price":1000.10,
							"imageUrl": "URL1",
							"description": "Description1",
							"category": "LAPTOPS"
							}
						""")
                )

                // Then
                .andExpect(status().isOk())
                .andExpect(content().json("""
					        {
							"name": "Product1",
							"price":1000.10,
							"imageUrl": "URL1",
							"description": "Description1",
							"category": "LAPTOPS"
							}
				"""))
                .andExpect(jsonPath("$.id").isString());
    }
    @Test
    @DirtiesContext
    void whenEditProductInfos_withDifferentIDs_returnBadRequest() throws Exception {
        // Given
        storeRepository.save(new Product("1","Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS));
        storeRepository.save(new Product("2","Product2",1000.10, "URL2","Description2", ProductCategory.LAPTOPS));
        // When
        mockMvc
                .perform(MockMvcRequestBuilders
                        .put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
							{"id": "2","name": "Product1","price":1000.20,"imageUrl": "URL1","description": "Description1","category": "LAPTOPS"}
						""")
                )

                // Then
                .andExpect(status().isBadRequest());
    }
    @Test
    @DirtiesContext
    void whenEditProductInfos_withNonExistentID_returnNotFound() throws Exception {
        // Given
        storeRepository.save(new Product("1","Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS));
        storeRepository.save(new Product("2","Product2",1000.10, "URL2","Description2", ProductCategory.LAPTOPS));
        // When
        mockMvc
                .perform(MockMvcRequestBuilders
                        .put("/api/products/5")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
							{"id": "5","name": "Product5","price":1000.50,"imageUrl": "URL5","description": "Description5","category": "LAPTOPS"}
						""")
                )

                // Then
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void whenEditProductInfos_withValidID_returnUpdatedProductAfterEditing() throws Exception {
        // Given
        storeRepository.save(new Product("1","Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS));
        storeRepository.save(new Product("2","Product2",1000.20, "URL2","Description2", ProductCategory.LAPTOPS));
        storeRepository.save(new Product("3","Product3",1000.30, "URL3","Description3", ProductCategory.LAPTOPS));
        storeRepository.save(new Product("4","Product4",1000.40, "URL4","Description4", ProductCategory.LAPTOPS));
        // When
        mockMvc
                .perform(MockMvcRequestBuilders
                        .put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
							{"id": "1","name": "Product1","price":1000.99,"imageUrl": "URL1","description": "Description1","category": "LAPTOPS"}
						""")
                )

                // Then
                .andExpect(status().isOk())
                .andExpect(content().json("""
					{"id": "1","name": "Product1","price":1000.99,"imageUrl": "URL1","description": "Description1","category": "LAPTOPS"}
				"""));
    }

    @Test
    @DirtiesContext
    void deleteProduct() throws Exception {
        // Given
        storeRepository.save(new Product("1","Product1",1000.10, "URL1","Description1", ProductCategory.LAPTOPS));

        // When
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/products/1"))

                // Then
                .andExpect(status().isOk());
    }
}
