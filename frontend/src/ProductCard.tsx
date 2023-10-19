import {Product} from "./Product.ts";

type Props = {
    product: Product
}
export default function ProductCard(props: Props) {

    return (
        <>
            <div className="ProductCard">
                <h3>id: {props.product.id}</h3>
                <p>name: {props.product.name}</p>
                <p>price: {props.product.price}</p>

            </div>
        </>
    )
}