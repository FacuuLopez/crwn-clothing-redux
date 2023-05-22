import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategories,
  selectIsLoading,
} from '../../store/categories/category.selector';

import { CategoryContainer, Title } from './category.styles';
import { selectIsProductsLoading, selectProducts } from '../../store/products/product.selector';
import { filterCategoryProducts } from '../../utils/categories/filter-categories';

const Category = () => {
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
        <CategoryContainer>
          {
            categoryProducts.map(product => <ProductCard key={product.id} product={product} />)
          }
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
