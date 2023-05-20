import { createAction } from '../../utils/reducer/reducer.utils';
import { PURCHASES_ACTION_TYPES } from './purchases.types';

export const setPurchases = (purchases) => createAction(PURCHASES_ACTION_TYPES.SET_PURCHASES, purchases);
