import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';

const ProductsPreview = () => {
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsProductsLoading);
    const user = useSelector(selectCurrentUser)

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='row gap-3'>
                        {
                            products.map(product => <ProductCard key={product.id} product={product} />)
                        }
                    </div>
                </div>

            )}
        </Fragment>
    );
};

export default ProductsPreview;
