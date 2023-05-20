import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles';

export const WishListDropdownContainer = styled.div`
position: absolute;
  width: 320px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
font-size: 18px;
margin: 50px auto;
`;

export const WishListItems = styled.div`
height: 100%;
display: flex;
flex-direction: column;
overflow: auto;
`;