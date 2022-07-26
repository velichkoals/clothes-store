import React, { Component } from 'react';
import Header from '../Header/Header';

import './Cart.scss';

class Cart extends Component {
	render() {
		return (
			<div>
				<Header category={localStorage.getItem('category')} />
				<div className='cart'>
					<div className='cart__title'>Cart</div>
				</div>
			</div>
		);
	}
}

export default Cart;
