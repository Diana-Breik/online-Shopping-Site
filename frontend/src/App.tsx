import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {NewProduct, Product} from "./Types.ts";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProductsGallery from "./ProductsGallery.tsx";
import StartPage from "./StartPage.tsx";
import ProductDetails from "./ProductDetails.tsx";
import AddNewProductPage from "./AddNewProductPage.tsx";

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
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
        navigate("/products");
    }
    return(
        <>
            <Routes>
                <Route path={"/"} element={<StartPage/>} />
                <Route path={"/products"} element={<ProductsGallery products={products} />}/>
                <Route path={"/products/:id"} element={<ProductDetails/>}/>
                <Route path={"/products/add"} element={<AddNewProductPage addNewProductMethod={AddNewProductCallbackMethod}/>}/>
            </Routes>



        </>
    )
}

export default App
