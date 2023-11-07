package com.example.backend;

import com.example.backend.models.NewProduct;
import com.example.backend.models.Product;
import com.example.backend.models.ProductCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

class StoreServiceTest {
    private StoreService storeService;
    private StoreRepository storeRepository;

    @BeforeEach
    void setUp() {
        storeRepository = mock(StoreRepository.class);
        storeService = new StoreService(storeRepository);
    }

    @Test
    void whenGetAllProducts_callsEmptyRepo_ThenReturnEmptyList() {
        // Given
        when(storeRepository.findAll()).thenReturn(List.of());

        // When
        List<Product> actual = storeService.getAllProducts();

        // Then
        verify(storeRepository).findAll();

        List<Product> expected = List.of();
        assertEquals(expected, actual);
    }

    @Test
    void whenGetAllProducts_callsNonEmptyRepo_ThenReturnListOfProducts() {
        // Given
        when(storeRepository.findAll()).thenReturn(List.of(
                new Product("1", "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS),
                new Product("2", "Product2", 600.20, "URL2","Description2", ProductCategory.SMARTPHONES),
                new Product("3", "Product3", 600.30, "URL3","Description3", ProductCategory.SMARTWATCHES)
        ));

        // When
       List<Product> actual = storeService.getAllProducts();

        // Then
        verify(storeRepository).findAll();

        List<Product> expected = List.of(
                new Product("1", "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS),
                new Product("2", "Product2", 600.20, "URL2","Description2", ProductCategory.SMARTPHONES),
                new Product("3", "Product3", 600.30, "URL3","Description3", ProductCategory.SMARTWATCHES)
                );
        assertEquals(expected, actual);
    }

    @Test
    void findProductById_WhenIdExist() {
        //GIVEN
        String id = "1";
        Product product1 = new Product("1", "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS);

        when(storeRepository.findById(id)).thenReturn(Optional.of(product1));

        //WHEN
        Product actual = storeService.getProductDetailsByID(id);

        //THEN
        Product expected = new Product("1", "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS);
        verify(storeRepository).findById(id);
        assertEquals(expected,actual);
    }

    @Test
    void findProductById_WhenIdNotExist(){
        //GIVEN
        String id ="5";

        when(storeRepository.findById(id)).thenReturn(Optional.empty());
        //WHEN
        //THEN
        assertThrows(NoSuchElementException.class, ()->storeService.getProductDetailsByID(id));
    }

  @Test
  void addNewProduct() {
      //GIVEN
      ArgumentCaptor<Product> productArgumentCaptor = ArgumentCaptor.forClass(Product.class);

      when(storeRepository.save(productArgumentCaptor.capture())).thenAnswer(invocationOnMock -> {
          Product savedProduct = invocationOnMock.getArgument(0);
          savedProduct = new Product("1",savedProduct.name(),savedProduct.price(),savedProduct.imageUrl(),savedProduct.description(),savedProduct.category());
          return savedProduct;
              });

      //WHEN
      Product actual = storeService.saveNewProduct(new NewProduct("Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS));

      //THEN
      verify(storeRepository).save(productArgumentCaptor.getValue());
      Product expected = new Product("1", "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS);
      assertEquals(expected, actual);
  }
    @Test
    void whenEditProductInfos_withDifferentIDs_throwIllegalArgumentException() {
        // Given
        String idInPath = "1";
        String idInTheBodyOfTheModifiedProduct = "2";

        // When
        Executable executable = () -> storeService.editProductInformation(idInPath, new Product(idInTheBodyOfTheModifiedProduct, "Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS));

        // Then
        assertThrows(IllegalArgumentException.class, executable);
    }
    @Test
    void whenEditProductInfos_withNonExistentID_throwNoSuchElementException() {
        // Given
        when(storeRepository.findById("5")).thenReturn(Optional.empty());

        // When
        Executable executable = () -> storeService.editProductInformation("5", new Product("5","Product5", 600.10, "URL5","Description5", ProductCategory.SMARTPHONES));

        // Then
        assertThrows(NoSuchElementException.class, executable);
        verify(storeRepository).findById("5");/* Wenn ich zuerst verify aufrufen und die Methode nicht aufgerufen wurde, wird der Test fehlschlagen, und die assertThrows-Überprüfung wird nicht erreicht. */
    }

    @Test
    void whenEditProductInfos_withValidID_returnUpdatedProductAfterEditing() {
        // Given
        when(storeRepository.findById("1")).thenReturn(
                Optional.of(new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS))
        );
        when(storeRepository.save(new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS))).thenReturn(
                new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS)
        );

        // When
        Product actual = storeService.editProductInformation("1", new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS));

        // Then
        verify(storeRepository).findById("1");
        verify(storeRepository).save(new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS));
        Product expected = new Product("1","Product1", 600.10, "URL1","Description1", ProductCategory.LAPTOPS);
        assertEquals(expected, actual);
    }

    @Test
    void deleteProduct() {
        // Given
        String id = "1";
        // When
        storeService.deleteProductFromTheStore(id);

        // Then
        verify(storeRepository).deleteById(id);
    }
}
