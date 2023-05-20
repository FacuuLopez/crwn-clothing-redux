import { useSelector } from 'react-redux';
import {
  WishListDropdownContainer,
  EmptyMessage,
  WishListItems,
} from './wish-list-dropdown.styles';
import { selectWishListItems } from '../../store/wish-list/wish-list.selector';
import WishListItem from '../wish-list-item/wish-list-item.component';

const WishListDropdown = () => {
  const wishListItems = useSelector(selectWishListItems);

  return (
    <WishListDropdownContainer>
      <WishListItems>
        {wishListItems.length ? (
          wishListItems.map((item) => <WishListItem wishListItem={item} />)
        ) : (
          <EmptyMessage>Your wish-list is empty</EmptyMessage>
        )}
      </WishListItems>
    </WishListDropdownContainer>
  );
};

export default WishListDropdown;
