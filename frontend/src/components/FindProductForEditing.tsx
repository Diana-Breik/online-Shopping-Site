import {Product} from "../Types.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import '../App.css'

type Props = {
    products: Product[]
    updateMethod: (productAfterEdit: Product) => void
}
export default function FindProductForEditing(props: Props) {
    const {id} = useParams();
    const filteredProducts : Product[] = props.products.filter(product => product.id === id);
    if (filteredProducts.length < 1) {
        return (
            <div className="showMessage">
                <p>Product not found</p>
            </div>
        )
    } else
        return <EditProductInfos productForEdit={filteredProducts[0]} updateMethod={props.updateMethod}/>
    }

type EditProps = {
    productForEdit : Product
    updateMethod: (productAfterEdit: Product) => void
}
function EditProductInfos(props: EditProps){

    const [productAfterEdit, setProductAfterEdit] = useState<Product>(props.productForEdit);
    const [enteredPrice, setEnteredPrice] = useState<string>(props.productForEdit.price.toString());
    const navigate= useNavigate();
    const [warningMessageToUser, setWarningMessageToUser] = useState(false);

    useEffect(
        ()=> setProductAfterEdit(props.productForEdit),
        [props.productForEdit]
    );
    function openConfirmation() {
        setWarningMessageToUser(true);
    }

    function closeConfirmation() {
        setWarningMessageToUser(false);
    }
    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
       setProductAfterEdit({...productAfterEdit, name: event.target.value});
    }
    function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
        setEnteredPrice(event.target.value);
    }
    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        setProductAfterEdit({...productAfterEdit, imageUrl: event.target.value});
    }
    function saveChanges( event: FormEvent<HTMLFormElement> ) {
        event.preventDefault();
        if(isNaN(Number(Number(enteredPrice.replace(",",".")).toFixed(2)))){
            console.error("This Price is NOT a number");
            openConfirmation();
            return
        }
        const newProduct= {...productAfterEdit, price: Number(Number(enteredPrice.replace(",",".")).toFixed(2))};
        setProductAfterEdit(newProduct);
        props.updateMethod(newProduct);
        closeConfirmation();
        navigate("/products/"+newProduct.id);
    }

    return(
        <div className="editProductInfosPage">

            <h3 className="titleEditProduct">Edit this Product Information in the store:</h3><br/>
            <form onSubmit={saveChanges}>
                <div className="editProductForm">
                    <label>Product Name    :</label><br/><input value={productAfterEdit.name} required={true} onChange={handleNameChange} placeholder=" Name"/>
                    <br/>
                    <label>Product Price   :</label><br/>
                    <div className="input-container">
                        <input value={enteredPrice} required={true} onChange={handlePriceChange} placeholder=" Price"/>
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
                    <label>Product Image    :</label><br/><input value={productAfterEdit.imageUrl} required={true} onChange={handleImageChange} placeholder=" Image"/>
                    <br/>
                </div>
                <div className="editProductPageButtons">
                    <button  className="cancelButtonForEditProductPage" onClick ={() => navigate("/products")} type="button">Cancel</button>
                    <button className="updateButtonForEditProductPage">Update</button>
                </div>
            </form>
        </div>
    )
}
