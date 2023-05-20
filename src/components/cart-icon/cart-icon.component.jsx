import { useSelector } from 'react-redux';

import {
  selectCartCount,
} from '../../store/cart/cart.selector';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {

  const cartCount = useSelector(selectCartCount);

  return (
    <CartIconContainer >
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
