import { ADD_TO_CART } from './actionTypes';

export const defaultState = {
	quantity: 0,
	cart: [],
};

export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				quantity: (state.quantity += 1),
				cart: [...state.cart, action.payload], // action.payload
			};
		default:
			return state;
	}
};
