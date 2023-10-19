import {Product} from "./Product.ts";
import ProductCard from "./ProductCard.tsx";

type Props = {
    products: Product[]
}
export default function ProductsGallery(props: Props){

    return (
        <>
            <div className="ProductsGallery">
                {
                    props.products.map( product =>
                        <ProductCard key={product.id} product={product}/>
                    )
                }
            </div>
        </>
    )
}