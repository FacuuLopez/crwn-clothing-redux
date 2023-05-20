import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.name === productToAdd.name
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.name === productToAdd.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const addCartItemByQuantity = (cartItems, productToAdd, quantity) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.name === productToAdd.name
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.name === productToAdd.name
        ? { ...cartItem, quantity: cartItem.quantity + quantity }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: quantity }];
};

export const emptyCart = () => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.name === cartItemToRemove.name
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.name !== cartItemToRemove.name);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.name === cartItemToRemove.name
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const setCart = (cartItems) => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.name !== cartItemToClear.name);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addManyCartItems = (cartItems, productToAdd, quantity) => {
  const newCartItems = addCartItemByQuantity(cartItems, productToAdd, quantity);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
