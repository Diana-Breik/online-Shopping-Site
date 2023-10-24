import {useParams} from "react-router-dom";
import axios from "axios";
import {Product} from "./Product.ts";
import {useEffect, useState} from "react";
import Navbar from "./Navbar.tsx";
import './App.css'

export default function ProductDetails(){

    const urlParams=useParams()

    const [product, setProduct] = useState<Product>();
    useEffect(loadProduct, [urlParams.id]);
    function loadProduct (){
        axios.get("/api/products/"+ urlParams.id)
            .then((response) => {
                if (response.status!==200)
                    throw new Error("Get wrong response status, when loading the product: "+response.status);
                setProduct(response.data)
            })
            .catch((error)=>{
                console.error(error);
            })
    }
    return(
        <div className="parentContainer">
            <div className="topBar">
                <Navbar />
            </div>
            <div className="productDetails">
            {
                product
                ? <>
                    <div className="productImage">
                    <img src={"https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80&w=2650&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Product image"/>
                    </div>
                    <div className="productText">
                    <h3>{product.price}€</h3><br/>
                        <p>{product.name}</p>
                    </div>
                </>
                : <div className="showMessage">
                    <p>Product not found</p>
                </div>
            }
            </div>
        </div>
    )
}