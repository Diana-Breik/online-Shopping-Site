import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NewProduct} from "../Types.ts";
import '../App.css'

type Props = {
    addNewProductMethod: (newProduct: NewProduct) => void
}
export default function AddNewProductPage(props: Props) {

    const [name, setName] = useState<string>("");
    const [enteredPrice, setEnteredPrice] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [warningMessageToUser, setWarningMessageToUser] = useState(false);
    const navigate = useNavigate();

    function onNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    function onPriceChange(event: ChangeEvent<HTMLInputElement>) {
        setEnteredPrice(event.target.value);
    }
    function onImageChange(event: ChangeEvent<HTMLInputElement>) {
        setImage(event.target.value)
    }
    function openConfirmation() {
        setWarningMessageToUser(true);
    }

    function closeConfirmation() {
        setWarningMessageToUser(false);
    }
    function saveNewProduct(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isNaN(Number(Number(enteredPrice.replace(",", ".")).toFixed(2)))) {
            console.error("This Price is NOT a number");
            openConfirmation();
            return
        }

        const newProductForSave: NewProduct = {
            name: name,
            price: Number(Number(enteredPrice.replace(",", ".")).toFixed(2)),
            imageUrl: image
        }
        props.addNewProductMethod(newProductForSave);
        setName("");
        setEnteredPrice("");
        closeConfirmation();
        setImage("");
        navigate("/products");

    }

    return (
        <div className="addProductPage">

            <h3 className="titleAddProduct">Add a new Product to the store:</h3><br/>
            <form onSubmit={saveNewProduct}>
                <div className="addProductForm">
                    <label htmlFor="fld_Name">Product Name :</label><br/><input id="fld_Name" value={name}
                                                                                required={true} onChange={onNameChange}
                                                                                placeholder=" Name"/>
                    <br/>
                    <label htmlFor="feld_Price">Product Price :</label><br/>
                    <div className="input-container">
                        <input id="feld_Price" value={enteredPrice} required={true} onChange={onPriceChange}
                               placeholder=" Price"/>
                        <span className="input-unit">€</span>
                    </div>
                    <br/>
                    {warningMessageToUser && (
                        <div className="confirmation-popup">
                            <div className="confirmation-box">
                                <p>The Price is NOT correct</p>
                                <div className="confirmation-buttons">
                                    <button className="okButton" onClick={closeConfirmation}>Ok</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <label htmlFor="fld_Image">Product Image :</label><br/><input id="fld_Image" value={image}
                                                                                required={true} onChange={onImageChange}
                                                                                placeholder=" Image"/>
                    <br/>
                </div>
                <div className="addProductPageButtons">
                    <button className="cancelButtonForAddProductPage" onClick={() => navigate("/")}
                            type="button">Cancel
                    </button>
                    <button className="saveButtonForAddProductPage">Save</button>
                </div>
            </form>

        </div>
    )
}