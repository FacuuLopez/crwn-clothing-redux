import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { getProducts, getUserProducts} from '../../utils/firebase/firebase.utils';

const CATEGORIES_INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: null,
};

const newProduct = (products, newProduct) => {
  return [...products, { newProduct }]
}

const removeProduct = (products, ProductToRemove) => {
  const productRemoved = products.filter((product) => product.name !== ProductToRemove.name);
  return productRemoved
};

const updateProducts = (products, productToUpdate, productUpdated) => {
  const updatedProducts = products.map(product => {
    return product.name === productToUpdate ? productUpdated : product
  })
  return updatedProducts
};

const productsSlice = createSlice({
  name: 'products',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    },
    deleteProduct(state, action) {
      state.products = removeProduct(action.payload)
    },
    addProduct(state, action) {
      state.products = newProduct(action.payload)
    },
    updateProduct(state,action) {
      state.products = updateProducts(action.payload)
    },
    fetchProductsStart(state) {
      state.isLoading = true;
    },
    fetchProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload
    },
    fetchProductsFailure(state, action) {
      state.isLoading = false;
      state.products = action.payload
    }
  }
})

export const { setProducts, fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const fetchProductsStartAsync = createAsyncThunk(
  'products/fetchProductsStartAsync',
  async (currentUser,  thunkAPI ) => {
    const {dispatch} = thunkAPI;
    dispatch(fetchProductsStart());
    try {
      const productsArray = await getProducts();
      console.log('productsArray_______', productsArray);
      dispatch(fetchProductsSuccess(productsArray));
      return productsArray;
    } catch (error) {
      dispatch(fetchProductsFailure(error));
      throw error;
    }
  }
);