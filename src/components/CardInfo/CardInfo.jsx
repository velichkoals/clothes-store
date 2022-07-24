import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { mapStateToProps } from '../ProductCard/ProductCard';
import { getProductInfoByIdQuery } from '../../queries/getProductInfoByIdQuery';
import Loader from '../Loader/Loader';

import './CardInfo.scss';

class CardInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			symbol: this.props.currency,
			amount: '',
			photo: '',
			isLoading: true,
		};
	}

	componentDidMount() {
		const params = this.props.params;
		let id = params?.cardId;

		getProductInfoByIdQuery(id).then((response) => {
			this.setState(
				{
					data: response.data.product,
					photo: response.data.product.gallery?.[0],
					isLoading: response.loading,
				},
				() => {
					this.getPrices();
				}
			);
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
	changeImage(image) {
		this.setState({
			photo: image,
		});
	}

	render() {
		return (
			<>
				<Header category={localStorage.getItem('category')} />
				{this.state.isLoading ? (
					<Loader />
				) : (
					<div className='card-info'>
						<div className='card-info__column'>
							<div className='card-info__gallery'>
								<div className='card-info__gallery_wrapper'>
									{this.state.data.gallery?.map((img) => (
										<img
											src={img}
											key={img}
											alt='gallery-img'
											className='card-info__gallery-item'
											onClick={() => this.changeImage(img)}
										/>
									))}
								</div>
								<img
									className='card-info__main-img'
									alt='main-img'
									src={this.state.photo}
								/>
							</div>
						</div>
						<div className='card-info__column info__text'>
							<div className='card-info__title'>{this.state.data.name}</div>
							<div className='card-info__brand'>{this.state.data.brand}</div>
							{this.state.data.attributes?.map((attribute) => (
								<div className='card-info__option' key={attribute.id}>
									<div className='card-info__option__title'>
										{attribute.name}:
									</div>
									<div className='card-info__option__wrapper'>
										{attribute.type === 'text'
											? attribute.items?.map((item) => (
													<div
														className='card-info__option__item'
														key={item.id}
													>
														{item.value}
													</div>
											  ))
											: null}
										{attribute.type === 'swatch'
											? attribute.items?.map((item) => (
													<div
														className='card-info__option__item-swatch'
														key={item.id}
														style={{
															backgroundColor: `${item.value}`,
														}}
													></div>
											  ))
											: null}
									</div>
								</div>
							))}
							<div className='card-info__price'>
								<div className='card-info__option__title'>Price:</div>
								<div className='card-info__option__price'>
									{this.state.symbol} {this.state.amount}
								</div>
							</div>
							<button className='card-info__btn'>Add to cart</button>
							<div
								className='card-info__description'
								dangerouslySetInnerHTML={{
									__html: this.state.data.description,
								}}
							/>
						</div>
					</div>
				)}
			</>
		);
	}
}

const Card = (props) => <CardInfo {...props} params={useParams()} />;

export default connect(mapStateToProps)(Card);
