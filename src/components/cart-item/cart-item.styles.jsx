import styled from 'styled-components';

export const CartDropdownContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 9px;
  font-size: 16px;
  border-bottom: 1px solid darkgrey;
  align-items: center;
`;

export const ImageContainer = styled.div`
  padding-right: 10px;
`;

export const BaseSpan = styled.span`
   max-width:100px; 
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
  margin: 0 5px;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 3px;
`;

export const RemoveButton = styled.div`
  padding-left: 8px;
  cursor: pointer;
`;
