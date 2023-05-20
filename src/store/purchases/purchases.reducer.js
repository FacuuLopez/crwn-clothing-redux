import { PURCHASES_ACTION_TYPES } from './purchases.types';

const PURCHASES_INITIAL_STATE = {
  purcheases: [],
};

export const purchasesReducer = (state = PURCHASES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PURCHASES_ACTION_TYPES.SET_PURCHASES:
      return {
        ...state,
        purchases: payload,
      };
    default:
      return state;
  }
};
