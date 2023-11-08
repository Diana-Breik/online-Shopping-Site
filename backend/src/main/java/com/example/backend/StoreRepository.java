package com.example.backend;

import com.example.backend.models.Product;
import com.example.backend.models.ProductCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StoreRepository extends MongoRepository<Product, String> {
    List<Product> findAllByCategory(ProductCategory category);
}
