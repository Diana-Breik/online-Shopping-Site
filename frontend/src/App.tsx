import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {Product} from "./Product.ts";
import {Route, Routes} from "react-router-dom";
import ProductsGallery from "./ProductsGallery.tsx";
import StartPage from "./StartPage.tsx";

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
    return(
        <>
            <Routes>
                <Route path={"/"} element={<StartPage/>} />
                <Route path={"/products"} element={<ProductsGallery products={products} />}/>
            </Routes>



        </>
    )
}

export default App
