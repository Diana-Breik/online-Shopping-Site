import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NewProduct} from "./Types.ts";

type Props = {
    addNewProductMethod : (newProduct : NewProduct) => void
}
export default function AddNewProductPage(props: Props){

    const [name,setName] = useState<string>("");
    const [price,setPrice] = useState<number>(0.0);
    const navigate = useNavigate();
    function onNameChange(event: ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }
    function onPriceChange(event: ChangeEvent<HTMLInputElement>){
        const priceValue = Number((event.target.valueAsNumber).toFixed(2));
        setPrice(priceValue);
    }
    function saveNewProduct(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        const newProductForSave: NewProduct = {
                name:name,
                price:price
            }
        props.addNewProductMethod(newProductForSave);
        setName("");
        setPrice(0.0);
        navigate("/products");
    }
return(
    <>
        <h3>Add a new Product to the store:</h3><br/>
        <form onSubmit={saveNewProduct}>
            <input value={name} onChange={onNameChange} placeholder="Name"/>
            <br/>
            <input value={price} type="number" onChange={onPriceChange} placeholder="Price"/>
            <br/><br/>
            <button>Save</button>
            <button onClick ={() => navigate("/")} type="button">Cancel</button>
        </form>
    </>
)
}