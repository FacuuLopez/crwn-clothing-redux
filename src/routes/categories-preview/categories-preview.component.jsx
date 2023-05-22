import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCategories,
  selectIsLoading,
} from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { createCategories, getUserCategories, getUserProducts } from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';
import { filterCategoryProducts } from '../../utils/categories/filter-categories';

const CategoriesPreview = () => {
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingProducts = useSelector(selectIsProductsLoading)
  const user = useSelector(selectCurrentUser);
  const products = useSelector(selectProducts);

  return (
    <Fragment>
      {isLoading || isLoadingProducts ? (
        <Spinner />
      ) : (
        <>
          {categories.length > 0 && categories.map(category => {
            const categoryProducts = filterCategoryProducts(products, category.products);
            console.log('category' ,category);
            console.log('categoryProducts' ,categoryProducts)
          return <CategoryPreview key={category.title} title={category.title} products={categoryProducts} />
          })}
        </>
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
