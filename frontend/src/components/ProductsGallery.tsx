import {Product} from "../Types.ts";
import ProductCard from "./ProductCard.tsx";
import Navbar from "./Navbar.tsx";
import '../App.css'
import {useState} from "react";

type Props = {
    products: Product[]
    deleteProductMethod: (id : string)=> void
}
export default function ProductsGallery(props: Props){
    const [optionValue, setOptionValue] = useState<string>("ALL");
    function findProductsByCategory(option: string){
        setOptionValue(option)
    }

    function resetOptionValueToALL() {
        setOptionValue("ALL")
    }
    return (
           <div className="productsGalleryBackGround">
             <div className="topBar">
                <Navbar handleClick={resetOptionValueToALL}/>
             </div>
               <select value={optionValue} className="filterProductsInGallery" onChange={e =>findProductsByCategory (e.target.value)}>
                   <option  value="ALL" className= "navText">All Products</option>
                   <option  value="LAPTOPS" className= "navText">Laptops</option>
                   <option  value="SMARTPHONES" className= "navText">Smartphones</option>
                   <option  value="SMARTWATCHES" className= "navText">Smartwatches</option>
               </select>
             <div className="productsGallery">
                {
                    props.products.filter(product => product.category === optionValue || optionValue === "ALL").map( product =>
                        <ProductCard key={product.id} product={product} deleteProductMethod={props.deleteProductMethod}/>
                    )
                }
             </div>
           </div>
    )
}