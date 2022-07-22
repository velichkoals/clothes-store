import React, { Component } from 'react';
import { ReactComponent as AddToCart } from '../../assets/add-to-cart.svg';
import { connect } from 'react-redux';
import { getProductByIdQuery } from '../../queries/getProductByIdQuery';

import './ProductCard.scss';

class ProductCard extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			isLoading: true,
			symbol: '',
			amount: '',
		};
	}

	componentDidMount() {
		getProductByIdQuery(this.props.id).then((response) => {
			this.setState({
				data: response.data.product,
				isLoading: response.loading,
				symbol: this.props.currency,
				amount: response.data.product.prices[0].amount,
			});
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.symbol !== this.props.currency) {
			this.getPrices();
		}
	}

	getPrices() {
		this.state.data.prices.filter((item) => {
			if (item.currency.symbol === this.props.currency) {
				this.setState({
					symbol: item.currency.symbol,
					amount: item.amount,
				});
			}
			return this.state.data.prices;
		});
	}

	render() {
		let inStock = true;
		if (!this.state.data.inStock) {
			inStock = false;
		}

		return this.state.isLoading ? (
			<div className='product-card loading'>
				<span className='card-loader'></span>
			</div>
		) : (
			<div className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
				<img
					src={`${this.state.data.gallery?.[0]}`}
					alt='card-img'
					className={`product-card__image ${!inStock ? 'out-of-stock' : ''}`}
				/>
				<div
					className={`product-card__title ${!inStock ? 'out-of-stock' : ''}`}
				>
					{this.state.data.name}
				</div>
				<div
					className={`product-card__price ${!inStock ? 'out-of-stock' : ''}`}
				>
					{`${this.state.symbol} ${this.state.amount}`}
				</div>

				{inStock ? (
					<AddToCart className='add-to-cart' width='52px' height='52px' />
				) : (
					<div className='product-card__out-of-stock'>Out of stock</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.currency,
});

export default connect(mapStateToProps)(ProductCard);
