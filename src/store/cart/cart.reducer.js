import { createSlice } from '@reduxjs/toolkit';

const CART_INITIAL_STATE = {
  cartItems: [],
};

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

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.name !== cartItemToClear.name);

const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setCartItems(state,action) {
      state.cartItems = action.payload
    }, 
    emptyCart(state) {
      state.cartItems = []
    },
    clearItemFromCart(state,action) {
      state.cartItems = clearCartItem(action.payload)
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(action.payload)
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(action.payload);
    },
    addManyCartItems(state,action) {
      state.cartItems = addCartItemByQuantity(action.payload)
    },
  }
});

export const { setCartItems, emptyCart, clearItemFromCart, removeItemFromCart, addItemToCart, addManyCartItems,} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;