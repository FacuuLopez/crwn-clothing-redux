import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';
import { purchasesReducer } from './purchases/purchases.reducer';
import { productsReducer } from './products/products.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  purchases: purchasesReducer,
  products: productsReducer,
});
