import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCategoriesStartAsync } from '../../store/categories/category.reducer';
import ProductsPreview from '../products-preview/products-preview.component';
import Product from '../product/product';

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<ProductsPreview />} />
      <Route path=':productName' element={<Product />} />
    </Routes>
  );
};

export default Products;
