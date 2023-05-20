import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';

import PanelCategoryPreview from '../../components/panel-category-preview/panel-category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const PanelCategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PanelCategoryPreview key={'New Category'} title='' products={[]} />
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return <PanelCategoryPreview key={title} title={title} products={products} />;
          })}
        </>
      )}
    </Fragment>
  );
};

export default PanelCategoriesPreview;
