import { ReactComponent as UserIconSVG } from '../../assets/user-icon.svg';
import { UserIconContainer} from './user-icon.styles';

const UserIcon = () => {
  return (
    <UserIconContainer >
      <UserIconSVG/>  
    </UserIconContainer>
  );
};

export default UserIcon;
