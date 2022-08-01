import React, { Component } from 'react';
import Header from '../Header/Header';
import CartItem from './CartItem/CartItem';

import './Cart.scss';
import { connect } from 'react-redux';
import { mapStateToProps } from '../ProductCard/ProductCard';

class Cart extends Component {
	render() {
		return (
			<>
				<Header category={localStorage.getItem('category')} />
				<div className='cart'>
					<div className='cart__title'>Cart</div>
					{this.props.cart.cart.map((item) => (
						<CartItem key={item.data.id} id={item.data.id} item={item} />
					))}
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps)(Cart);
