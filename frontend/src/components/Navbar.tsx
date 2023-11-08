import '../App.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {ProductCategory} from "../Types.ts";

type Props = {
    findProductsByCategory: (category:ProductCategory)=> void
}
export default function Navbar(props:Props){
    const [menuToggel,setMenuToggel] = useState<boolean>(false);
    const navigate = useNavigate();
    function toggelMenu(){
        setMenuToggel(!menuToggel);
    }
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
    return(
        <>
        <div className={menuToggel? 'navbar active':'navbar' }>
            <ul className={'nav-menu'}>
                <li className={'nav-item'}>
                    <Link to={`/`} className= "navText">Home</Link> {/*am besten benutzt man da <Link> / <NavLink> oder useNavigate()*/}
                </li>
                <li className={'nav-item'}>
                        <select onChange={e =>navigateWhenClickAllProducts (e.target.value)}>
                            <option  value="ALL" className= "navText">All Products</option>
                            <option  value="LAPTOPS" className= "navText">Laptops</option>
                            <option  value="SMARTPHONES" className= "navText">Smartphones</option>
                            <option  value="SMARTWATCHES" className= "navText">Smartwatches</option>
                        </select>
                </li>
                <li className={'nav-item'}>
                    <Link to={`/products/add`} className= "navText">Add product</Link>
                </li>
            </ul>
        </div>
            <button type={"button"} onClick={toggelMenu} className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </>
        )

}