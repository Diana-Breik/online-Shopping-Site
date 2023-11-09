import {Product, ProductCategory} from "../Types.ts";
import ProductCard from "./ProductCard.tsx";
import Navbar from "./Navbar.tsx";
import '../App.css'
import {useNavigate} from "react-router-dom";

type Props = {
    products: Product[]
    deleteProductMethod: (id : string)=> void
    findProductsByCategory:(category : ProductCategory)=> void
}
export default function ProductsGallery(props: Props){

    const navigate = useNavigate();
    function navigateWhenClickAllProducts(option: string){
        if(option==="ALL")
            navigate("/products");
        else if(option==="LAPTOPS")
            props.findProductsByCategory("LAPTOPS")
        else if(option==="SMARTPHONES")
            props.findProductsByCategory("SMARTPHONES")
        else
            props.findProductsByCategory("SMARTWATCHES")

    }
    return (
           <div className="productsGalleryBackGround">
             <div className="topBar">
                <Navbar />
             </div>
               <select className="filterProductsInGallery" onChange={e =>navigateWhenClickAllProducts (e.target.value)}>
                   <option  value="ALL" className= "navText">All Products</option>
                   <option  value="LAPTOPS" className= "navText">Laptops</option>
                   <option  value="SMARTPHONES" className= "navText">Smartphones</option>
                   <option  value="SMARTWATCHES" className= "navText">Smartwatches</option>
               </select>
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