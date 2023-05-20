import { ReactComponent as LikeIcon } from '../../assets/heart-icon-transparent.svg';
import { WishListIconContainer} from './wish-list-icon.styles';

const WishListIcon = () => {

  //const toggleIsWishListOpen = () => dispatch(setIsWishListOpen(!isWishListOpen));

  return (
    <WishListIconContainer >
      <LikeIcon />
    </WishListIconContainer>
  );
};

export default WishListIcon;
