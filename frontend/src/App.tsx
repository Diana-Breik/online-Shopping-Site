import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {NewProduct, Product} from "./Types.ts";
import {Route, Routes} from "react-router-dom";
import ProductsGallery from "./components/ProductsGallery.tsx";
import StartPage from "./components/StartPage.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import AddNewProductPage from "./components/AddNewProductPage.tsx";
import FindProductForEditing from "./components/FindProductForEditing.tsx";

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(loadAllProducts,[]);
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
    return(
        <>
            <Routes>
                <Route path={"/"} element={<StartPage/>} />
                <Route path={"/products"} element={<ProductsGallery products={products} deleteProductMethod={deleteProductCallbackMethod}/>}/>
                <Route path={"/products/:id"} element={<ProductDetails products={products}/>}/>
                <Route path={"/products/add"} element={<AddNewProductPage addNewProductMethod={AddNewProductCallbackMethod}/>}/>
                <Route path={"/products/:id/edit"} element={<FindProductForEditing products={products} updateMethod={updateProductInfosCallbackMethod} />}/>
            </Routes>



        </>
    )
}

export default App
