import './App.css'
export default function Navbar(){
    return(
        <div className={'navbar'}>
            <ul className={'nav-menu'}>
                <li className={'nav-item'}>
                    <a href={"/"}>Home</a>
                </li>
                <li className={'nav-item'}>
                    <a href={"/products"}>Products</a>
                </li>
            </ul>
        </div>
        )

}