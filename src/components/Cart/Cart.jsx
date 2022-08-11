import React, { Component } from 'react';
import Header from '../Header/Header';
import CartItem from './CartItem/CartItem';
import { connect } from 'react-redux';
import { store } from '../../store';
import { mapStateToProps } from '../ProductCard/ProductCard';
import { withRouter } from '../../helpers/withRouter';
import { clearCartAction } from '../../store/cart/actionCreators';

import './Cart.scss';

class Cart extends Component {
	constructor() {
		super();
		this.handleOrder = this.handleOrder.bind(this);
	}
	handleOrder() {
		const navigate = this.props.navigate;
		store.dispatch(clearCartAction());
		navigate('/');
	}
	render() {
		return (
			<>
				<Header category={localStorage.getItem('category')} />
				<div className='cart'>
					<div className='cart__title'>Cart</div>
					{this.props.cart.cart.map((item) => (
						<CartItem key={item.uniqueId} id={item.uniqueId} item={item} />
					))}
					<hr className='cart__line' />
					<div className='cart__text'>
						{' '}
						Quantity: <span>{this.props.cart.quantity}</span>
					</div>
					<div className='cart__text'>
						{' '}
						Total: <span>${this.props.cart.totalAmount}</span>
					</div>
					<button
						type='submit'
						className='submit-btn'
						onClick={this.handleOrder}
					>
						Order
					</button>
				</div>
			</>
		);
	}
}

export default withRouter(connect(mapStateToProps)(Cart));
