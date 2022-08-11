import React, { Component } from 'react';
import CartItem from '../../Cart/CartItem/CartItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../../store';
import { mapStateToProps } from '../../ProductCard/ProductCard';
import { clearCartAction } from '../../../store/cart/actionCreators';
import { withRouter } from '../../../helpers/withRouter';

import './MiniCart.scss';

class MiniCart extends Component {
	constructor() {
		super();
		this.handleOrder = this.handleOrder.bind(this);
	}

	handleOrder() {
		const navigate = this.props.navigate;
		store.dispatch(clearCartAction());
		navigate('/');
		this.props.handleClose();
	}

	render() {
		let open = this.props.open;
		if (!open) return null;

		return (
			<div className='mini-cart-wrapper' onClick={this.props.handleClose}>
				<div
					className={`mini-cart`}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className='mini-cart__title'>
						My bag,{' '}
						<span className='mini-cart__quantity'>
							{this.props.cart.quantity} items
						</span>
					</div>
					{this.props.cart.cart.map((item) => (
						<CartItem key={item.uniqueId} id={item.uniqueId} item={item} />
					))}
					<div className='mini-cart__total'>
						<div className='mini-cart__total__item'>Total</div>{' '}
						<div className='mini-cart__total__item'>
							${this.props.cart.totalAmount}
						</div>
					</div>
					<div className='mini-cart__btns__wrapper'>
						<Link to={`/cart`} className='open-cart__btn mini-cart__btn'>
							View bag
						</Link>
						<button
							type='submit'
							className='submit-btn mini-cart__btn'
							onClick={this.handleOrder}
						>
							Check out
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(MiniCart));
