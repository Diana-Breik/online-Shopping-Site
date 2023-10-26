import {Product} from "./Types.ts";
import './App.css'
import {Link} from "react-router-dom";
import bildForCard from '/hintergrund.jpg'

type Props = {
    product: Product
}
export default function ProductCard(props: Props) {

    return (
            <div className="productCard">
                <Link to={`/products/${props.product.id}`}>
                <img className="productFoto" src={bildForCard} alt=""/>
                <div className="productInfoBox">
                  <div className="productName">
                    <p>{props.product.name}</p>
                  </div>
                <div className="price">
                    <p>{props.product.price}€</p>
                </div>
               </div>
                </Link>
            </div>
    )
}