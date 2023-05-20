import styled from 'styled-components';

export const UserDropdownContainer = styled.div`
  position: absolute;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 43px;
  right: ${props => props.right}px;
  z-index: 5;
  white-space: nowrap;
  a{
    cursor: pointer;
  }
  p {
    
  }
  ul li{
    margin: 10px 0;
  }
  ul li a{
    line-height: 1;
  }
  svg {
    width: 24px;
    height: 24x;
   
  }
`;

