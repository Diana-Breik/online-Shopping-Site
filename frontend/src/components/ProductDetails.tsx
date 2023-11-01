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
                    <img src={"https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80&w=2650&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Product image"/>
                    </div>
                    <div className="productText">
                    <h3>{filteredProduct.price}€</h3><br/>
                        <p>{filteredProduct.name}</p>
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