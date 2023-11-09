import '../App.css'
import Image from "../images/HellerHintergrund.jpg";
import Navbar from "./Navbar.tsx";

export default function StartPage(){

    return (
            <div className="startPage" style={{backgroundImage:`url(${Image})`}}>
                <div className="topBar">
                    <Navbar/>
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