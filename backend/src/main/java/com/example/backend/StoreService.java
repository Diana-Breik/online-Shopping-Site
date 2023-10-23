package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public List<Product> getAllProducts() {
        return storeRepository.findAll();
    }

    public Product getProductDetailsByID(String id) {
        Optional<Product> optionalProduct =  storeRepository.findById(id);
        if(optionalProduct.isPresent()){
            return optionalProduct.get();
        }else {
            throw new NoSuchElementException("This product does not exist");
        }
    }
}
