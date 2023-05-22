import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { getCategories, getUserCategories} from '../../utils/firebase/firebase.utils';

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

const newCategory = (categories, newCategory) => {
  return [...categories, { newCategory }]
}

const removeCategory = (categories, CategoryToRemove) => {
  const categoryRemoved = categories.filter((category) => category.name !== CategoryToRemove.name);
  return categoryRemoved
};

const updateCategories = (categories, categoryToUpdate, categoryUpdated) => {
  const updatedCategories = categories.map(category => {
    return category.name === categoryToUpdate ? categoryUpdated : category
  })
  return updatedCategories
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    },
    deleteCategory(state, action) {
      state.categories = removeCategory(action.payload)
    },
    addCategory(state, action) {
      state.categories = newCategory(action.payload)
    },
    updateCategory(state,action) {
      state.categories = updateCategories(action.payload)
    },
    fetchCategoriesStart(state) {
      state.isLoading = true;
    },
    fetchCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categories = action.payload
    },
    fetchCategoriesFailure(state, action) {
      state.isLoading = false;
      state.categories = action.payload
    }
  }
})

export const { setCategories, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

export const fetchCategoriesStartAsync = createAsyncThunk(
  'categories/fetchCategoriesStartAsync',
  async (currentUser,  thunkAPI ) => {
    const {dispatch} = thunkAPI;
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategories();
      console.log('categoriesArray_______', categoriesArray);
      dispatch(fetchCategoriesSuccess(categoriesArray));
      return categoriesArray;
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
      throw error;
    }
  }
);