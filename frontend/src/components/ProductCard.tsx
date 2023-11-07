import {Product} from "../Types.ts";
import '../App.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

type Props = {
    product: Product
    deleteProductMethod: (id: string) => void
}
export default function ProductCard(props: Props) {

    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);


    function navigateWhenClickEdit() {
        navigate("/products/" + props.product.id + "/edit");
    }
    function openConfirmation() {
        setShowConfirmation(true);
    }

    function closeConfirmation() {
        setShowConfirmation(false);
    }

    function deleteProductFunction() {
        openConfirmation();
    }

    function confirmDelete() {
        closeConfirmation();
        props.deleteProductMethod(props.product.id);
    }

    return (
        <div className="productCard">
            <Link to={`/products/${props.product.id}`}>
                <img className="productFoto" src={props.product.imageUrl} alt="Product Image"/>
            </Link>
            <div className="listButtons">
                <button className="editButton" type={"button"} onClick={navigateWhenClickEdit}>
                    <svg width="15px" height="15px" viewBox="0 0 32 32" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M31.25 7.003c0-0 0-0.001 0-0.001 0-0.346-0.14-0.659-0.365-0.886l-5-5c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-20.999 20.999c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009-2 7c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 6.788-2c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 21.211-21c0.229-0.226 0.37-0.539 0.371-0.886v-0zM8.133 26.891l-4.307 1.268 1.287-4.504 14.891-14.891 3.219 3.187zM25 10.191l-3.228-3.196 3.228-3.228 3.229 3.228z"></path>
                    </svg>
                </button>
                <button className="deleteButton" type={"button"} onClick={deleteProductFunction}>
                    <svg width="15px" height="15px" viewBox="5 2 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M14.5 3L15.5 4H19V6H5V4H8.5L9.5 3H14.5ZM12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88L9.87 10.47L12 12.59ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM16 9H8V19H16V9Z"
                            fill="#000000"/>
                    </svg>
                </button>
            </div>
            <Link to={`/products/${props.product.id}`}>
                <div className="productInfoBox">
                    <div className="productName">
                        <p>{props.product.name}</p>
                    </div>
                    <div className="price">
                        <p>{props.product.price}€</p>
                    </div>
                </div>
            </Link>
            {showConfirmation && (
                <div className="confirmation-popup">
                    <div className="confirmation-box">
                        <p>Do you really want to delete this product?</p>
                        <div className="confirmation-buttons">
                            <button className="cancel-delete" onClick={closeConfirmation}>No, Cancel</button>
                            <button className="confirm-delete" onClick={confirmDelete}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}