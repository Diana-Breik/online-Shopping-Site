package com.example.backend;

import com.example.backend.models.NewProduct;
import com.example.backend.models.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

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

    public Product saveNewProduct(NewProduct newProduct) {
        Product product = new Product(UUID.randomUUID().toString(), newProduct.name(), newProduct.price(), newProduct.imageUrl(),newProduct.description(),newProduct.category());
        return storeRepository.save(product);
    }

    public Product editProductInformation(String id, Product productAfterEditing) {
        if (!id.equals(productAfterEditing.id()))
            throw new IllegalArgumentException("The given Id in the Path: (%s) and the Id of productAfterEditing: (%s) are different".formatted(id, productAfterEditing.id()));

        Optional<Product> existingProductBeforeEditing = storeRepository.findById(id);
        if (existingProductBeforeEditing.isEmpty())
            throw new NoSuchElementException("This product that has this Id (%s) in the path does not exist".formatted(id));

        return storeRepository.save(productAfterEditing);
    }

    public void deleteProductFromTheStore(String id) {
        storeRepository.deleteById(id);
    }
}
