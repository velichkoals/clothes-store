import {
	ADD_TO_CART,
	INCREASE_EXISTING_PRODUCT,
	DECREASE_EXISTING_PRODUCT,
	REMOVE_FROM_CART,
	CLEAR_CART,
} from './actionTypes';

export const defaultState = {
	quantity: 0,
	cart: [],
};

export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			return {
				quantity: (state.quantity += 1),
				cart: [...state.cart, action.payload],
			};
		}

		case REMOVE_FROM_CART: {
			return {
				quantity: (state.quantity -= 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId !== action.payload ? item : null
					),
				],
			};
		}
		case CLEAR_CART: {
			return { quantity: 0, cart: [] };
		}
		case INCREASE_EXISTING_PRODUCT: {
			return {
				quantity: (state.quantity += 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId === action.payload ? (item.itemQuantity += 1) : item
					),
				],
			};
		}
		case DECREASE_EXISTING_PRODUCT: {
			return {
				quantity: (state.quantity -= 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId === action.payload ? (item.itemQuantity -= 1) : item
					),
				],
			};
		}
		default:
			return state;
	}
};
