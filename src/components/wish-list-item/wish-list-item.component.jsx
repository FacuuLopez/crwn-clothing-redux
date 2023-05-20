import { useDispatch, useSelector } from 'react-redux';
import { selectWishListItems } from '../../store/wish-list/wish-list.selector';
import {
  WishListDropdownContainer,
  ImageContainer,
  BaseSpan,
  RemoveButton,
} from './wish-list-item.styles';
import { removeItemFromWishList } from '../../store/wish-list/wish-list.action';

const WishListItem = ({ wishListItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl,price } = wishListItem;
  const wishListItems = useSelector(selectWishListItems);
  const clearItemHandler = () => dispatch(removeItemFromWishList(wishListItems,wishListItem));

  return (
    <WishListDropdownContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
        <p> {name} </p>
      </ImageContainer>
     
      <BaseSpan> ${price}/u.</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </WishListDropdownContainer>
  );
};

export default WishListItem;
