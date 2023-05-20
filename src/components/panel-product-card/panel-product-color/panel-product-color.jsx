import { useState } from "react";

const PanelProductColor = (color, updateColors) => {
    
    const { productColorName = '', productColorImageURL = '', productColorStock = 0 } = color;
    const prevColor = productColorName;
    const [colorName, setColorName] = useState(productColorName);
    const [colorImageUrl, setColorImageUrl] = useState(productColorImageURL)
    const [colorStock, setColorStock] = useState(productColorStock);

    const onChangeProductColorName = (newColorName) => {
        setColorName(newColorName);
    }
    const onChangeProductColorImage = (newImageUrl) => {
        setColorImageUrl(newImageUrl)
    }
    const onChangeProductColorStock = (newStock) => {
        setColorStock(newStock)
    }

    const saveColor = () => {
        const color = {colorName,colorImageUrl,colorStock};
        colorName && colorImageUrl && updateColors(prevColor, color); 
    }

    const deleteColor = () => {
        updateColors(prevColor,color);
    }

    return (
        <li key={`${color.productColorName}`}>
            <span className='input-group-text' htmlFor={`${color.productColorName}`}>Color: {productColorName}</span>
            <input
                type='text'
                id={`${productColorName}`}
                value={productColorName}
                onChange={(e) => onChangeProductColorName(e.target.value)}
            />
            <span className='input-group-text' htmlFor={`${color.onChangeProductColorStock}`}>Stock: {productColorStock}</span>
            <input
                type='number'
                id={`${productColorName}_Stock`}
                value={productColorStock}
                onChange={(e) => onChangeProductColorStock(e.target.value)}
            />
            <label htmlFor={`${color.productColorName}_image`}>Product Image:  
            {productColorImageURL ?
            <img style={{ width: '40px', height: '40px', cursor: 'pointer' }} src={productColorImageURL} />:
            <img style={{ width: '40px', height: '40px', cursor: 'pointer' }} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8VnNdKbMkivHDNI4XI3bIjmMeKqU5AiHww&usqp=CAU'} />
            }
            
            {color.productColorName}</label>
            <input style={{ display: "none" }} type='file' id={`${color.productColorName}_image`} onChange={onChangeProductColorImage} accept="image/*" />
            <button onChange={saveColor} className="btn btn-primary">Save</button>
            {prevColor && <button onChange={deleteColor} className="btn btn-danger">Delete</button>}
            
        </li>
    );
}

export default PanelProductColor;