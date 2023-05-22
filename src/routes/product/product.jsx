import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner.component';
import ProductView from '../../components/product-view/product-view';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';


const Product = () => {
  const { productName } = useParams();
   const formattedProductName = productName.replace(/-/g, ' '); 
  const isLoading = useSelector(selectIsProductsLoading);
  const products = useSelector(selectProducts)
  const product = products.find(product => product.name.toLowerCase() === formattedProductName.toLowerCase());
 
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
