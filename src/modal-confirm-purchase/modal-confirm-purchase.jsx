import Purchase from "../components/purchase/purchase"
import { emptyCart } from "../store/cart/cart.reducer";
import { createNewPurchase } from "../utils/firebase/firebase.utils";

const ModalConfirmPurchase = ({ id,purchase,callback }) => {
    return (
        <div className="modal" id={id} data-bs-backdrop="static" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Do you want to confirm the purchase</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        
                    </div>
                    <div className="modal-body">
                        <Purchase purchase={purchase} />
                    </div>
                    <div className="modal-footer d-flex justify-content-between px-3">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        <button onClick={callback} type="button" className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ModalConfirmPurchase;