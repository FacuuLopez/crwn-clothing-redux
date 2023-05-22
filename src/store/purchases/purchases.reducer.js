import { createSlice } from '@reduxjs/toolkit';

const PURCHASES_INITIAL_STATE = {
  purcheases: [],
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: PURCHASES_INITIAL_STATE,
  reducers: {
    setPurchases(state,action) {
      state.purchases = action.payload;
    }
  }
})

export const {setPurchases} = purchasesSlice.actions;

export const purchasesReducer = purchasesSlice.reducer;


