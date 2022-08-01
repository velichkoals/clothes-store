import { ADD_TO_CART } from './actionTypes';

export const addItemToCartAction = (payload) => ({
	type: ADD_TO_CART,
	payload,
});
