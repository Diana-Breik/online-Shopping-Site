package com.example.backend;

import com.example.backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StoreRepository extends MongoRepository<Product,String> {
}
