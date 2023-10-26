import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NewProduct} from "./Types.ts";

type Props = {
    addNewProductMethod : (newProduct : NewProduct) => void
}
export default function AddNewProductPage(props: Props) {

    const [name, setName] = useState<string>("");
    const [enteredPrice, setEnteredPrice] = useState<string>("");
    const [warningMessageToUser, setWarningMessageToUser] = useState(false);
    const navigate = useNavigate();

    function onNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function onPriceChange(event: ChangeEvent<HTMLInputElement>) {
            setEnteredPrice(event.target.value);
    }

    function saveNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(isNaN(Number(Number(enteredPrice.replace(",",".")).toFixed(2)))){
            console.error("This Value is NOT a number");
            setWarningMessageToUser(true);
            return
        }

        const newProductForSave: NewProduct = {
            name: name,
            price: Number(Number(enteredPrice.replace(",",".")).toFixed(2))
        }
        props.addNewProductMethod(newProductForSave);
        setName("");
        setEnteredPrice("");
        setWarningMessageToUser(false);
        navigate("/products");

}
return(
    <>
        <h3>Add a new Product to the store:</h3><br/>
        <form onSubmit={saveNewProduct}>
            <input value={name} required={true} onChange={onNameChange} placeholder="Name"/>
            <br/>
            <input value={enteredPrice} required={true} onChange={onPriceChange} placeholder="Price"/>
            <br/>
            {warningMessageToUser && <p>This Value is NOT a number</p>}
            <br/><br/>
            <button>Save</button>
            <button onClick ={() => navigate("/")} type="button">Cancel</button>
        </form>

    </>
)
}