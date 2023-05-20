import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserDropdownContainer } from './user-dropdown.styles';
import { ReactComponent as UserIcon } from '../../assets/user-icon.svg';
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag.svg';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';


const UserDropdown = ({position}) => {
  const currentUSer = useSelector(selectCurrentUser);
  const middlePosition = (0-position) / 2;
  return (
    <UserDropdownContainer  right={middlePosition}>
      <p>Hello! {currentUSer && currentUSer.displayName}</p>
      <ul className='list-unstyled'>
       <li> <Link to='my-shopping'>My Shopping<ShopIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }}/> </Link></li>
        <li><Link to='my-profile'>My Profile <UserIcon style={{ width: '20px', height: '20px', marginLeft: '8px' }} /></Link></li>
        <li><a onClick={signOutUser}>Sign Out <i className="lh-1 px-2 bi bi-box-arrow-in-right fs-4"></i></a></li>
      </ul>
    </UserDropdownContainer>
  );
};

export default UserDropdown;
