import {
	ADD_TO_CART,
	INCREASE_EXISTING_PRODUCT,
	DECREASE_EXISTING_PRODUCT,
	REMOVE_FROM_CART,
} from './actionTypes';

export const addItemToCartAction = (payload) => ({
	type: ADD_TO_CART,
	payload,
});

export const removeItemFromCartAction = (payload) => ({
	type: REMOVE_FROM_CART,
	payload,
});

export const increaseExistingProduct = (payload) => ({
	type: INCREASE_EXISTING_PRODUCT,
	payload,
});

export const decreaseExistingProduct = (payload) => ({
	type: DECREASE_EXISTING_PRODUCT,
	payload,
});
