import {
	ADD_TO_CART,
	INCREASE_EXISTING_PRODUCT,
	DECREASE_EXISTING_PRODUCT,
	REMOVE_FROM_CART,
	CLEAR_CART,
} from './actionTypes';

export const addItemToCartAction = (payload) => ({
	type: ADD_TO_CART,
	payload,
});

export const removeItemFromCartAction = (id, price) => ({
	type: REMOVE_FROM_CART,
	payload: {
		id,
		price,
	},
});

export const clearCartAction = () => ({
	type: CLEAR_CART,
});

export const increaseExistingProduct = (id, price) => ({
	type: INCREASE_EXISTING_PRODUCT,
	payload: {
		id,
		price,
	},
});

export const decreaseExistingProduct = (id, price) => ({
	type: DECREASE_EXISTING_PRODUCT,
	payload: {
		id,
		price,
	},
});
