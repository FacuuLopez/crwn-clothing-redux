import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { serverTimestamp } from 'firebase/firestore';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';
import { createNewPurchase, updateUserCart } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useEffect, useState } from 'react';
import { emptyCart } from '../../store/cart/cart.reducer';
import ModalConfirmPurchase from '../../modal-confirm-purchase/modal-confirm-purchase';
import Purchase from '../../components/purchase/purchase';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [purchase, setPurchase] = useState({});

  const updateCartWithDebounce = debounce(() => {
    updateUserCart(currentUser, cartItems)
  }, 5000);

  const makePurchase = () => {
    const createdAt = new Date();
    const products = cartItems.map((product) => {
      console.log('product ', product);
      const { name, quantity, price, imageUrl, color: colorSelected } = product;
      const total = quantity * price;
      return { name, quantity, price, total, imageUrl, color: colorSelected };
    });
    setPurchase(
      {
        user: currentUser.email,
        total: cartTotal,
        products,
      }
    )
  };
    

  const confirmPurchase = async () => {
    await createNewPurchase(purchase, currentUser);
    emptyCart();
  };

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {cartItems.length > 0 && (<button type="button" onClick={makePurchase} className="mt-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalConfirmPurchase">
        Buy
      </button>)}
      <ModalConfirmPurchase purchase={purchase} id="modalConfirmPurchase" callback={()=>confirmPurchase()} /> 
      {/* <div className="modal" id="modalConfirmPurchase" data-backdrop="static" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Do you want to confirm the purchase</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                      {purchase && <Purchase purchase={purchase} />}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button onClick={()=>confirmPurchase()} type="button" className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div> */}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
