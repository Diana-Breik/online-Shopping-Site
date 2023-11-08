import '../App.css'
import Image from "../images/HellerHintergrund.jpg";
import Navbar from "./Navbar.tsx";
import {ProductCategory} from "../Types.ts";
type Props = {
    findProductsByCategory:(category : ProductCategory)=> void
}
export default function StartPage(props : Props){

    return (
            <div className="startPage" style={{backgroundImage:`url(${Image})`}}>
                <div className="topBar">
                    <Navbar findProductsByCategory={props.findProductsByCategory} />
                </div>
                    <div className="content">
                        <h1>TechWorld</h1>
                        <p>
                            Here you can shop for everything you need in the world of technology
                        </p>
                     </div>
            </div>
    )
}