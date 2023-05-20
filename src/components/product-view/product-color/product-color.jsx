import { useState } from "react";

const ProductColor = ({color}) => {
    
    const { productColorName , productColorImageURL } = color;
    return (
        <li key={`${color.productColorName}`}>
            <span>Color: {productColorName}</span>
            <img style={{ width: '40px', height: '40px', cursor: 'pointer' }} src={productColorImageURL} />:
        </li>
    );
}

export default ProductColor;