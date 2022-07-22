import { GET_CURRENCY } from './actionTypes';

export const defaultState = '$';

export const currencyReducer = (state = defaultState, action) => {
	switch (action.type) {
		case GET_CURRENCY:
			return action.payload;

		default:
			return state;
	}
};
