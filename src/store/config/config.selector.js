import { createSelector } from 'reselect';

const selectConfigReducer = (state) => state.config;

export const selectIsConfigOpen = createSelector(
  [selectConfigReducer],
  (config) => config.isConfigOpen
);
