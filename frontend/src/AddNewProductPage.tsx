import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NewProduct} from "./Types.ts";

type Props = {
    addNewProductMethod : (newProduct : NewProduct) => void
}
export default function AddNewProductPage(props: Props) {

    const [name, setName] = useState<string>("");
    const [enteredPrice, setEnteredPrice] = useState<string>("");
    let warningMessageToUser: boolean = false;
    const navigate = useNavigate();

    function onNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function onPriceChange(event: ChangeEvent<HTMLInputElement>) {

        /*const priceValue = event.target.value;
        console.log(Number(priceValue))*/

            setEnteredPrice(event.target.value);

        /* const priceValue = (event.target.valueAsNumber);
         console.log(priceValue)
         if(!isNaN(priceValue)){
             setPrice(priceValue);
         }

 */
    }

    function saveNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(isNaN(Number(enteredPrice.replace(",",".")))){
           console.error("nicht gültig")
            return
        }

        const newProductForSave: NewProduct = {
            name: name,
            price: Number(enteredPrice.replace(",","."))
        }
        props.addNewProductMethod(newProductForSave);
        setName("");
        setEnteredPrice("");
        navigate("/products");

}
return(
    <>
        <h3>Add a new Product to the store:</h3><br/>
        <form onSubmit={saveNewProduct}>
            <input value={name} onChange={onNameChange} placeholder="Name"/>
            <br/>
            <input value={enteredPrice} onChange={onPriceChange} placeholder="Price"/>
            <br/><br/>
            <button>Save</button>
            <button onClick ={() => navigate("/")} type="button">Cancel</button>
        </form>
        {warningMessageToUser && <span>This Value is NOT a number</span>}
    </>
)
}