import { createSelector } from 'reselect';

const selectPurchasesReducer = (state) => state.purchases;

export const selectPurchases = createSelector(
  [selectPurchasesReducer],
  (purchases) => purchases.purchases
); 

