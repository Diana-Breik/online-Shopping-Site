package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
