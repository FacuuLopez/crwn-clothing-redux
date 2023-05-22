import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCategories,
  selectIsLoading,
} from '../../store/categories/category.selector';
import PanelCategoryPreview from '../../components/panel-category-preview/panel-category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { filterCategoryProducts } from '../../utils/categories/filter-categories';

const PanelCategoriesPreview = () => {
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
          <PanelCategoryPreview key={'New Category'} title='' products={[]} />
          {categories.map(category => {
            const categoryProducts = filterCategoryProducts(products, category.products);
            return <PanelCategoryPreview key={category.title} title={category.title} products={categoryProducts} />
          })}
        </>
      )}
    </Fragment>
  );
};

export default PanelCategoriesPreview;
