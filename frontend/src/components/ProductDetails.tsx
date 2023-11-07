import {useParams} from "react-router-dom";
import {Product} from "../Types.ts";
import Navbar from "./Navbar.tsx";
import '../App.css'

type Props = {
    products: Product[]
}
export default function ProductDetails(props : Props){

    const urlParams=useParams();
    const filteredProduct = props.products.find(product => product.id === urlParams.id);

    return(
        <div className="parentContainer">
            <div className="topBar">
                <Navbar />
            </div>
            <div className="productDetails">
            {
                filteredProduct
                ? <>
                    <div className="productImage">
                    <img src={filteredProduct.imageUrl} alt="Product Image"/>
                    </div>
                    <div className="productText">
                    <h3>{filteredProduct.price}€</h3><br/>
                        <p>{filteredProduct.name}</p><br/>
                        <p>{filteredProduct.description}</p>
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