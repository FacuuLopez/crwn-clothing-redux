import styled from 'styled-components';
import { ReactComponent as LikeIcon } from '../../assets/like-logo.svg';

export const ProductCartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const LikeIconStyle = styled(LikeIcon)`
height: 24px;
width: 24px;
/* fill: ${props => props.isLiked ? 'red' : 'gray'};
transition: all 0.2s ease-in-out; */

&:hover {
  transform: scale(1.1);
}

&:active {
  transform: scale(0.9);
}
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
`;
