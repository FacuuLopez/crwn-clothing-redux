import { createSelector } from 'reselect';

const selectWishListReducer = (state) => state.wishList;

export const selectIsWishListOpen = createSelector(
  [selectWishListReducer],
  (wishList) => wishList.isWishListOpen
);

export const selectWishListItems = createSelector(
  [selectWishListReducer],
  (wishList) => wishList.wishListItems
);

