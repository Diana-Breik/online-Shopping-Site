package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;
    @GetMapping
    public List<Product> getAllProducts(){
        return storeService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductDetailsByID(@PathVariable String id){
        return storeService.getProductDetailsByID(id);
    }
}
