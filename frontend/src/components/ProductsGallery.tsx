import {Product, ProductCategory} from "../Types.ts";
import ProductCard from "./ProductCard.tsx";
import Navbar from "./Navbar.tsx";
import '../App.css'

type Props = {
    products: Product[]
    deleteProductMethod: (id : string)=> void
    findProductsByCategory:(category : ProductCategory)=> void
}
export default function ProductsGallery(props: Props){

    return (
           <div className="productsGalleryBackGround">
             <div className="topBar">
                <Navbar findProductsByCategory={props.findProductsByCategory} />
             </div>
             <h2 className="titleProductsGallery">All products</h2>
             <div className="productsGallery">
                {
                    props.products.map( product =>
                        <ProductCard key={product.id} product={product} deleteProductMethod={props.deleteProductMethod}/>
                    )
                }
             </div>
           </div>
    )
}