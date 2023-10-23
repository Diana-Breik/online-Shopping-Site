import {useParams} from "react-router-dom";
import axios from "axios";
import {Product} from "./Product.ts";
import {useEffect, useState} from "react";
import Navbar from "./Navbar.tsx";

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
            {
                product
                ? <>
                    <img className="productFoto" src={"./src/images/hintergrund.jpg"} alt=""/>
                    <h3>{product.name}</h3><br/>
                    {product.price && <p>Price        : <br/>{product.price}€</p>}
                </>
                : <>
                    <p>Product not found</p>
                </>
            }
        </div>
    )
}