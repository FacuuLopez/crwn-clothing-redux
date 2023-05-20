import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { addItemToWishList } from '../../store/wish-list/wish-list.action';
import { selectWishListItems } from '../../store/wish-list/wish-list.selector';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, description = '' } = product;
  const dispatch = useDispatch();
  const wishListItems = useSelector(selectWishListItems);
  const cartItems = useSelector(selectCartItems);
  const cardRef = useRef(null);

  useEffect(() => {
    const cardWidth = cardRef.current.clientWidth;
    cardRef.current.style.height = `${cardWidth * 1.25}px`;
  }, []);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  const addProductToWishList = () => dispatch(addItemToWishList(wishListItems, product));

  return (
    <Link to={`../../products/${name.replace(/ /g, '-')}`} className='card'>
      <img ref={cardRef} className='card-img-top ' src={imageUrl} alt={`${name}`} />
      <div className='card-body'>
        {/* <LikeIconStyle onClick={addProductToWishList} /> */}
        <h4 className='card-title'> {name}</h4>
        {description && <p className='card-text'>{description}</p>}
        <h3 className='card-text fw-bold'>$ {price}</h3>
      </div>
      {/* <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button> */}
    </Link>
  );
};

export default ProductCard;
