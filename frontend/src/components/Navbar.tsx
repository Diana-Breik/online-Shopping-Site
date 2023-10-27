import '../App.css'
import {Link} from "react-router-dom";
import {useState} from "react";
export default function Navbar(){
    const [menuToggel,setManuToggel] = useState<boolean>(false);
    function toggelMenu(){
        setManuToggel(!menuToggel);
    }
    return(
        <>
        <div className={menuToggel? 'navbar active':'navbar' }>
            <ul className={'nav-menu'}>
                <li className={'nav-item'}>
                    <Link to={`/`} className= "navText">Home</Link> {/*am besten benutzt man da <Link> / <NavLink> oder useNavigate()*/}
                </li>
                <li className={'nav-item'}>
                    <Link to={`/products`} className= "navText">Products</Link>
                </li>
                <li className={'nav-item'}>
                    <Link to={`/products/add`} className= "navText">Add product</Link>
                </li>
            </ul>
        </div>
            <div onClick={toggelMenu} className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </>
        )

}