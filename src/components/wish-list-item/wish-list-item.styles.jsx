import styled from 'styled-components';

export const WishListDropdownContainer = styled.div`
width: 100%;
display: flex;
margin-bottom: 9px;
font-size: 16px;
border-bottom: 1px solid darkgrey;
align-items: center;

`;

export const ImageContainer = styled.div`
width: 60%;
padding-right: 10px;
display: flex;
flex-direction: column;
text-align: center;

img {
  width: 100%;
  height: 100%;
}
`;

export const BaseSpan = styled.span`
 width: 50%; 
`;


export const RemoveButton = styled.div`
padding-left: 8px;
cursor: pointer;
`;
