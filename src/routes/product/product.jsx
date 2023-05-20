import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';
import { useEffect } from 'react';
import PanelProductCard from '../../components/panel-product-card/panel-product-card.component';
import ProductView from '../../components/product-view/product-view';


const Product = () => {
  const { productName } = useParams();
   const formattedProductName = productName.replace(/-/g, ' '); 
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const products = Object.keys(categoriesMap).map(category => categoriesMap[category]).flat()
  const product = products.find(product => product.name.toLowerCase() === formattedProductName.toLowerCase());


  
  useEffect(()=>{console.log('!!!!!!!!!! categoriesMap object: ----------', product)},[])

 
  return (
    <>
       {isLoading ? (
        <Spinner />
      ) : (
          <ProductView product={product} />    
      )}
    </>
  );
};

export default Product;
