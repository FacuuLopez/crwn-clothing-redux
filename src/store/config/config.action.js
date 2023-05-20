import { createAction } from '../../utils/reducer/reducer.utils';
import { CONFIG_ACTION_TYPES } from './config.types';

export const setIsConfigOpen = (boolean) =>
  createAction(CONFIG_ACTION_TYPES.SET_IS_CONFIG_OPEN, boolean);
