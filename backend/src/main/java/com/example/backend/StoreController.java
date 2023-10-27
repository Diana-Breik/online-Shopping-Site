package com.example.backend;

import com.example.backend.models.NewProduct;
import com.example.backend.models.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

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

    @PostMapping
    public Product addNewProduct(@RequestBody NewProduct newProduct){
        return storeService.saveNewProduct(newProduct);
    }
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchElementException(NoSuchElementException exception){
        String message = "NoSuchElementException: %s".formatted(exception.getMessage());
        return new ErrorMessage(message);
    }
}
