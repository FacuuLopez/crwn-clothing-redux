import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';
import { purchasesReducer } from './purchases/purchases.reducer';
import { configReducer } from './config/config.reducer';
import { wishListReducer } from './wish-list/wish-list.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  wishList: wishListReducer,
  cart: cartReducer,
  purchases : purchasesReducer,
  config: configReducer,
});
