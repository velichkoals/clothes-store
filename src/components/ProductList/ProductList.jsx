import React, { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getAllProductsQuery } from '../../queries/getAllProductsQuery';
import { client } from '../../index';

import './ProductList.scss';

class ProductList extends Component {
	constructor() {
		super();
		this.state = {
			category: [],
		};
	}

	componentDidMount() {
		client.query({ query: getAllProductsQuery }).then((response) => {
			this.setState({
				category: response.data.category.products,
			});
		});
	}

	render() {
		return (
			<div className='product-list'>
				<div className='product-list__title'>All products</div>
				<div className='product-card__wrapper'>
					{this.state.category.map((product) => (
						<ProductCard key={product.id} id={product.id} />
					))}
				</div>
			</div>
		);
	}
}

export default ProductList;
