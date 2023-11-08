package com.example.backend;

import com.example.backend.models.NewProduct;
import com.example.backend.models.Product;
import com.example.backend.models.ProductCategory;
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

    @GetMapping("/{category}")
    public List<Product> getAllProductsFromThisCategory(@PathVariable ProductCategory category){
        return storeService.getAllProductsFromThisCategory(category);
    }

    @PostMapping
    public Product addNewProduct(@RequestBody NewProduct newProduct){
        return storeService.saveNewProduct(newProduct);
    }
    @PutMapping("/{id}")
    public Product editProductInfos(@PathVariable String id, @RequestBody Product productAfterEditing){
        return storeService.editProductInformation(id,productAfterEditing);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id){
        storeService.deleteProductFromTheStore(id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchElementException(NoSuchElementException exception){
        String message = "NoSuchElementException: %s".formatted(exception.getMessage());
        return new ErrorMessage(message);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleIllegalArgumentException(IllegalArgumentException exception){
        String message = "IllegalArgumentException: %s".formatted(exception.getMessage());
        return new ErrorMessage(message);
    }
}
