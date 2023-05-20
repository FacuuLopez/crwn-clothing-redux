import { useDispatch} from 'react-redux';
import './panel-product-card.styles.css';
import { useState } from 'react';
import PanelProductColor from './panel-product-color/panel-product-color';

const PanelProductCard = ({ product }) => {
  const { name, description = '', stock = 0, price, imageUrl, secondaryImages = [], colors = [], categories = [] } = product;
  const [newSecondaryImages, setNewSecondaryImages] = useState(secondaryImages);
  const [newSecondaryImage, setNewSecondaryImage] = useState({ imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8VnNdKbMkivHDNI4XI3bIjmMeKqU5AiHww&usqp=CAU' });
  const [newDescription, setNewDescription] = useState(description);
  const [newColors, setNewColors] = useState(colors);
  const [newColor, setNewColor] = useState({ name: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8VnNdKbMkivHDNI4XI3bIjmMeKqU5AiHww&usqp=CAU' });
  const [newImage, setNewImage] = useState(imageUrl);
  const [newPrice, setNewPrice] = useState(price);
  const [newName, setNewName] = useState(name);
  const [newStock, setNewStock] = useState(stock)
  const dispatch = useDispatch();

  const onChangeSecondaryImage = (e) => {

  }

  const onChangePrice = (e) => {
    setNewPrice(e.target.value);
    console.log(e.target.value);
  }

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log('file', file);
    reader.onload = function (event) {
      const newImagePath = event.target.result;
      setNewImage(newImagePath);
    };

    reader.readAsDataURL(file);
  }

  const onChangeName = e => {
    setNewName(e.target.value);
  }

  /* const onChangeStock = (size, color, newStock) => {
    setNewStock(prevStock => {
      return prevStock.map((item) => {
        return (
          item.size === size && item.color === color
            ? { ...item, stock: newStock }
            : item
        )
      })
    })
  } */

  const onChangeStock = (stock) => {
    setNewStock(stock);
  }


  const onChangeDescription = e => {
    setNewDescription(e.target.value);
  }

  const replaceColor = (prevColor, newColor) => {
    const { newColorName } = newColor;
    setNewColors(prevColors => {
      const updatedColors = prevColors.map(color => {
        if (color.colorName === newColorName) {
          return newColor;
        }
        return color;
      });
      return updatedColors;
    });
  };
  
  const removeColor = (prevColor) => {
    setNewColors(prevColors => prevColors.filter(color => color.colorName !== prevColor.colorName));
  };
  

  const updateColors = (prevColor, color) => {
    prevColor ?
      color ? replaceColor(prevColor, color)
        : removeColor(prevColor)
      : setNewColors((prevState) => [...prevState, color]);
  }

  return (
    <div className='container-fluid my-2'>
      <div className='row'>
        <div className='col-md-6 col-12 d-flex'>
          <div className='col-4 col-md-2 d-flex align-items-center flex-column'>
            <ul className='list-unstyled h-100 overflow-auto py-3 '>
              <li className='p-2'>
                <label htmlFor={`new_secondary_image`}><img style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={newColor.imageUrl} /></label>
                <input className="d-none" type='file' id={`new_secondary_image`} onChange={onChangeSecondaryImage} accept="image/*" />
              </li>
              {newSecondaryImages && newSecondaryImages.map((secondaryImage) => {
                <li>
                  <span className='input-group-text' htmlFor={`secondary_image_${secondaryImage.position}`}><img className='w-100' src={secondaryImage.imageURL} /></span>
                  <input className="d-none" type='file' id={`secondary_image_${secondaryImage.position}`} onChange={onChangeSecondaryImage} accept="image/*" />
                </li>
              })}
            </ul>
          </div>
          <div className='col-8 col-md-10 px-1'>
            <label className='w-100' htmlFor={`inputImageProduct${name}`}>
              <img src={newImage} className='w-100' alt={`Product ${name}`} />
            </label>
            <input id={`inputImageProduct${name}`} className='d-none' type='file' onChange={onChangeImage} />
          </div>
        </div>
        <div className='col-md-6 col-12 d-flex justify-content-around flex-column'>
          <div className="input-group my-1 input-group-sm">
            <span className='input-group-text' >Product's Name</span>
            <input className="form-control" type='text' id={`inputNameProduct${name}`} onChange={onChangeName} placeholder="Product's Name" value={newName} />
          </div>
          <div className="my-1 input-group input-group-sm">
            <span className='input-group-text'>Product's Description</span>
            <input className="form-control" type='text' id={`inputDescriptionProduct${name}`} onChange={onChangeDescription} placeholder="Product's Name" value={newName} />
          </div>
          <div className=" my-1 input-group input-group-sm">
            <span className='input-group-text' >Product's Price $</span>
            <input className="form-control" id={`inputPriceProduct${name}`} type='number' onChange={onChangePrice} value={newPrice} />
          </div>
          {!colors && <div className=" my-1 input-group input-group-sm">
            <span className='input-group-text' >Product's Stock $</span>
            <input className="form-control" id={`inputStockProduct${name}`} type='number' onChange={onChangeStock} value={newStock} />
          </div>}
          <div className='my-1'>
            <ul style={{ maxHeight: "130px" }} className='list-unstyled m-0 overflow-auto  border border-1 rounded border-info p-2'>
              <PanelProductColor color={{}} upadtaColors={(color) => updateColors(color)} />
              {newColors.map((color) => {
                return (
                  <PanelProductColor color={color} upadtaColors={(color) => updateColors(color)} />
                );
              })}
            </ul>
          </div>
          <div className='d-flex justify-content-end my-2'>
            <button className='btn btn-primary text-uppercase p-1 px-3 mx-3'>Save</button>
          </div>
        </div>
      </div>
      {/* <Footer>
       
        

        
        <input type='file' onChange={onChangeImage} />
        <input type='button' value='Update Product' />
        <input type='button' value='Delete' />
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Change Image
      </Button> */}
    </div>
  );
};

export default PanelProductCard;
