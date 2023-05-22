import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductColor from './product-color/product-color';
import { addManyCartItems } from '../../store/cart/cart.reducer';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useNavigate } from 'react-router-dom';

const ProductView = ({ product }) => {
    const { name, description = '', stock = 0, price, imageUrl, secondaryImages = [], colors = [] } = product;
    const [itemStock, setItemStock] = useState(stock)
    const [colorSelected, setColorSelected] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate()

    useEffect(() => { colors.length > 0 && setColorSelected(colors[0]) }
        , [])

    const onChangeColorSelected = (color) => {
        setColorSelected(color.productColorName)
        setItemStock(color.productColorStock)
    }

    const addItemToCart = () => {
        if (quantity > 0) {
            dispatch(addManyCartItems(cartItems, { name, description, price, imageUrl, color: colorSelected }, Number(quantity)));
            navigate('/checkout');
        } else alert('The quantity must be higher than 0');

    }

    return (
        <div className='container-fluid my-2'>
            <div className='row'>
                <div className='col-md-6 col-12 d-flex'>

                    {secondaryImages ?
                        <>
                            <div className='col-4 col-md-2 d-flex align-items-center flex-column'>
                                <ul className='list-unstyled h-100 overflow-auto py-3 '>
                                    <li className='p-2'>
                                        {secondaryImages.map(secondaryImage => <img style={{ width: '50px', height: '50px', cursor: 'pointer' }} src={secondaryImage.imageUrl} />)}
                                    </li>
                                </ul>
                            </div>
                            <div className='col-8 col-md-10 px-1'>
                                <img src={imageUrl} className='w-100' alt={`Product ${name}`} />
                            </div>
                        </>
                        :
                        <img src={imageUrl} className='w-100' alt={`Product ${name}`} />
                    }
                </div>
                <div className='col-md-6 col-12 d-flex justify-content-around flex-column'>
                    <h3 >{name}</h3>


                    <p >{description}</p>


                    <p >Price: ${price}</p>

                    {colors.length > 0 && (
                        <div className='my-1'>
                            <select
                                style={{ maxHeight: "130px" }}
                                className='form-select m-0 overflow-auto border border-1 rounded border-info p-2'
                                value={colorSelected}
                                onChange={(e) => onChangeColorSelected(e.target.value)}
                            >
                                {colors.map((color) => (
                                    <option key={`peoduct_color_${color}`} value={color}>
                                        <ProductColor color={color} />
                                    </option>
                                ))}
                            </select>
                        </div>
                    )
                    }


                    <p >Stock: {itemStock}</p>
                    <div className='d-flex justify-content-end my-2'>
                        <input type='number' min={1} max={100} step={1} className='text-center rounded-2' style={{width: '50px'}} onChange={e => setQuantity(e.target.value)} value={quantity} />
                        <button onClick={addItemToCart} className='btn btn-primary text-uppercase p-1 px-3 mx-3'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
