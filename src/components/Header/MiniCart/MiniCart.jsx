import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MiniCart.scss';

class MiniCart extends Component {
	render() {
		let open = this.props.open;
		if (!open) return null;
		return (
			<div className='mini-cart-wrapper' onClick={this.props.handleClose}>
				<div
					className='mini-cart'
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					Mini-cart
					<Link to={`/cart`} className='open-cart__btn'>
						View bag
					</Link>
				</div>
			</div>
		);
	}
}

export default MiniCart;
