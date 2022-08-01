import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { currencyReducer } from './currency/reducer';
import { cartReducer } from './cart/reducer';

const rootReducer = combineReducers({
	cart: cartReducer,
	currency: currencyReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
