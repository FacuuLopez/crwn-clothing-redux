import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
    selectCategoriesMap,
    selectIsLoading,
} from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';
import { createProducts } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';

const ProductsPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const user = useSelector(selectCurrentUser)

    const exportProducts = () => {
        const products = Object.keys(categoriesMap).map((title) => {
            const category = categoriesMap[title];
            return (
                category.map((product => { return {name: product.name, price: product.price, imageUrl: product.imageUrl}}))            
                )
        }).flat()
        const categories = Object.keys(categoriesMap).flat()
        console.log(products);
        createProducts(products, user);
    }
    
    

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='container-fluid'>
                    <button onClick={exportProducts}>click</button>
                    <h1 className='text-center'>Products</h1>
                    <div className='row gap-3'>
                        {Object.keys(categoriesMap).map((title) => {
                            const products = categoriesMap[title];
                            return (
                                <div className='col-md-6 col-lg-4'>
                                    {
                                        products.map((product => <ProductCard key={product.id} product={product} />
                                        ))
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>

            )}
        </Fragment>
    );
};

export default ProductsPreview;
