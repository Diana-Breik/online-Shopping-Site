import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {NewProduct, Product, ProductCategory} from "./Types.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProductsGallery from "./components/ProductsGallery.tsx";
import StartPage from "./components/StartPage.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import AddNewProductPage from "./components/AddNewProductPage.tsx";
import FindProductForEditing from "./components/FindProductForEditing.tsx";

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);
    useEffect(loadAllProducts,[]);
    const navigate = useNavigate();
    function loadAllProducts (){
        axios.get("/api/products")
            .then((response) => {
                if (response.status!==200)
                    throw new Error("Get wrong response status, when loading all products: "+response.status);
                setProducts(response.data);
            })
            .catch((error)=>{
                console.error(error);
            })
    }
    const AddNewProductCallbackMethod = (newProduct : NewProduct) => {
        axios.post("/api/products",newProduct)
            .then((response)=>{
                if (response.status!==200)
                    throw new Error("Get wrong response status, when adding a new product: "+response.status);
                setProducts(prevState => [...prevState,response.data]);
                loadAllProducts();
            })
            .catch((error)=>{
                console.error(error);
            })
    }
    function updateProductInfosCallbackMethod( productAfterEdit: Product ) {
        axios
            .put('/api/products/'+productAfterEdit.id, productAfterEdit)
            .then(response => {
                if (response.status != 200)
                    throw new Error("Got wrong status on update product: " + response.status);
                setProducts((prevState) => prevState.map((product) =>(product.id === response.data.id ? response.data : product)));
                loadAllProducts();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function deleteProductCallbackMethod(id : string){
        axios.delete("/api/products/" + id)
            .then(response => {
                if (response.status != 200)
                    throw new Error("Got wrong status on delete product: " + response.status);
                loadAllProducts();
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function findSpecificGroupOfProductsCallbackMethod(category : ProductCategory){
        axios.get("/api/products/filter/" + category)
            .then((response) => {
                if (response.status!==200)
                    throw new Error("Get wrong response status, when loading all products: "+response.status);
                setProductsByCategory(response.data);
            })
            .catch((error)=>{
                console.error(error);
            })
        navigate("/products/filter/" + category);
    }
    return(
        <>
            <Routes>
                <Route path={"/"} element={<StartPage findProductsByCategory={findSpecificGroupOfProductsCallbackMethod}/>} />
                <Route path={"/products"} element={<ProductsGallery products={products} deleteProductMethod={deleteProductCallbackMethod} findProductsByCategory={findSpecificGroupOfProductsCallbackMethod}/>}/>
                <Route path={"/products/:id"} element={<ProductDetails products={products} findProductsByCategory={findSpecificGroupOfProductsCallbackMethod}/>}/>
                <Route path={"/products/add"} element={<AddNewProductPage addNewProductMethod={AddNewProductCallbackMethod}/>}/>
                <Route path={"/products/:id/edit"} element={<FindProductForEditing products={products} updateMethod={updateProductInfosCallbackMethod} />}/>
                <Route path={"/products/filter/:category"} element={<ProductsGallery products={productsByCategory} deleteProductMethod={deleteProductCallbackMethod} findProductsByCategory={findSpecificGroupOfProductsCallbackMethod}/>}/>
            </Routes>



        </>
    )
}

export default App
