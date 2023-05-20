import { createAction } from '../../utils/reducer/reducer.utils';
import { WISH_LIST_ACTION_TYPES } from './wish-list.types';

const addWishListItem = (wishListItems, productToAdd) => {
  const existingWishListItem = wishListItems.find(
    (wishListItem) => wishListItem.id === productToAdd.id
  );
  return existingWishListItem
    ? wishListItems
    : [...wishListItems, { ...productToAdd}]
};


const removeWishList = (wishList, wishListItemToRemove) => {
  // find the wishList item to remove
  const existingWishListItem = wishList.find(
    (wishListItem) => wishListItem.id === wishListItemToRemove.id
  );
  return existingWishListItem ?
    wishList.filter((wishListItem) => wishListItem.id !== wishListItemToRemove.id) :
    wishList
};

export const addItemToWishList = (wishLists, productToAdd) => {
  const newWishLists = addWishListItem(wishLists, productToAdd);
  return createAction(WISH_LIST_ACTION_TYPES.SET_WISH_LIST_ITEMS, newWishLists);
};

export const removeItemFromWishList = (wishLists, wishListToRemove) => {
  const newWishLists = removeWishList(wishLists, wishListToRemove);
  return createAction(WISH_LIST_ACTION_TYPES.SET_WISH_LIST_ITEMS, newWishLists);
};

export const setIsWishListOpen = (boolean) =>
  createAction(WISH_LIST_ACTION_TYPES.SET_IS_WISH_LIST_OPEN, boolean);
