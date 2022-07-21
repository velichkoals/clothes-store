import React, { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProductsQuery } from '../../queries/getProductsQuery';

import './ProductList.scss';

class ProductList extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
		};
	}

	componentDidMount() {
		this.getProducts(this.props.category);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.category !== this.props.category) {
			this.getProducts(this.props.category);
		}
	}

	getProducts(category) {
		getProductsQuery(category).then((response) => {
			this.setState({
				products: response.data.category.products,
			});
		});
	}

	render() {
		return (
			<div className='product-list'>
				<div className='product-list__title'>{this.props.title}</div>
				<div className='product-card__wrapper'>
					{this.state.products.map((product) => (
						<ProductCard key={product.id} id={product.id} />
					))}
				</div>
			</div>
		);
	}
}

export default ProductList;
