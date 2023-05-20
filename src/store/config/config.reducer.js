import { CONFIG_ACTION_TYPES } from './config.types';

const CONFIG_INITIAL_STATE = {
  isConfigOpen: false,
};

export const configReducer = (state = CONFIG_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIG_ACTION_TYPES.SET_IS_CONFIG_OPEN:
      return {
        ...state,
        isConfigOpen: payload,
      };
    default:
      return state;
  }
};
