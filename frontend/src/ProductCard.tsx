import {Product} from "./Product.ts";
import './App.css'

type Props = {
    product: Product
}
export default function ProductCard(props: Props) {

    return (
        <>
            <div className="productCard">
               {/* <h3>id: {props.product.id}</h3>*/}
                <img className="productFoto" src={"./src/images/hintergrund.jpg"} alt=""/>
                <div className="productInfoBox">
                  <div className="productName">
                    <p>{props.product.name}</p>
                  </div>
                <div className="price">
                    <p>{props.product.price}€</p>
                </div>

               </div>
            </div>
        </>
    )
}