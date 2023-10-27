import './App.css'
import {Link} from "react-router-dom";
export default function Navbar(){
    return(
        <div className={'navbar'}>
            <ul className={'nav-menu'}>
                <li className={'nav-item'}>
                    <Link to={`/`}>Home</Link> {/*am besten benutzt man da <Link> / <NavLink> oder useNavigate()*/}
                </li>
                <li className={'nav-item'}>
                    <Link to={`/products`}>Products</Link>
                </li>
                <li className={'nav-item'}>
                    <Link to={`/products/add`}>Add product</Link>
                </li>
            </ul>
        </div>
        )

}