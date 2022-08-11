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
	totalAmount: 0,
};

export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			return {
				quantity: (state.quantity += 1),
				cart: [...state.cart, action.payload],
				totalAmount: parseFloat(
					(state.totalAmount + action.payload.data?.prices[0].amount).toFixed(2)
				),
			};
		}

		case REMOVE_FROM_CART: {
			return {
				quantity: (state.quantity -= 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId !== action.payload.id ? item : null
					),
				],
				totalAmount: parseFloat(
					(state.totalAmount - action.payload.price).toFixed(2)
				),
			};
		}

		case CLEAR_CART: {
			return { quantity: 0, cart: [], totalAmount: 0 };
		}

		case INCREASE_EXISTING_PRODUCT: {
			return {
				quantity: (state.quantity += 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId === action.payload.id
							? (item.itemQuantity += 1)
							: item
					),
				],
				totalAmount: parseFloat(
					(state.totalAmount + action.payload.price).toFixed(2)
				),
			};
		}

		case DECREASE_EXISTING_PRODUCT: {
			return {
				quantity: (state.quantity -= 1),
				cart: [
					...state.cart.filter((item) =>
						item.uniqueId === action.payload.id
							? (item.itemQuantity -= 1)
							: item
					),
				],
				totalAmount: parseFloat(
					(state.totalAmount - action.payload.price).toFixed(2)
				),
			};
		}
		default:
			return state;
	}
};
