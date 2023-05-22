import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategories,
  selectIsLoading,
} from '../../store/categories/category.selector';

import { PanelCategoryContainer, Title } from './panel-category.styles';
import { filterCategoryProducts } from '../../utils/categories/filter-categories';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';

const PanelCategory = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const isProductsLoading = useSelector(selectIsProductsLoading)
  const products = useSelector(selectProducts)
  const categorySelected = categories.find(categoryItem => categoryItem.title.toLowerCase() === category.toLowerCase());
  const categoryProducts = filterCategoryProducts(products, categorySelected.title)

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading || isProductsLoading ? (
        <Spinner />
      ) : (
        <PanelCategoryContainer>
          {
            categoryProducts.map(product => <ProductCard key={product.id} product={product} />)
          }
        </PanelCategoryContainer>
      )}
    </Fragment>
  );
};

export default PanelCategory;
