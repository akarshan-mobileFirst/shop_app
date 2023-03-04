import {combineReducers} from 'redux';

import ShopReducer from '../slices/shop_slice';

const rootReducer = combineReducers({
  shop: ShopReducer,
});

export default rootReducer;
