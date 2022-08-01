import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import CardData from '../CardData/CardData';
import Loader from '../Loader/Loader';
import { connect } from 'react-redux';
import { store } from '../../store';
import { mapStateToProps } from '../ProductCard/ProductCard';
import { getProductInfoByIdQuery } from '../../queries/getProductInfoByIdQuery';
import { addItemToCartAction } from '../../store/cart/actionCreators';
import { withRouter } from '../../helpers/withRouter';

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
			validation: [],
		};
		this.handleClick = this.handleClick.bind(this);
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

	handleClick(event, value) {
		this.state.data.attributes.map((attribute) => {
			if (attribute.name === event.target.name) {
				this.setState((prevState) => ({
					validation: [
						...prevState.validation,
						{
							name: event.target.name,
							value,
							isChecked: true,
						},
					],
				}));
			}
			return value;
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const navigate = this.props.navigate;

		if (
			(Object.keys(this.state.validation).length === 0 &&
				this.state.data.attributes.length !== 0) ||
			Object.keys(this.state.validation).length !==
				this.state.data.attributes.length
		) {
			alert('Select product options!');
		} else {
			const dataObj = {
				itemQuantity: 0,
				data: this.state.data,
				amount: this.state.amount,
				symbol: this.state.symbol,
				selected: this.state.validation,
			};

			store.dispatch(addItemToCartAction(dataObj));
			navigate(`/all`);
		}
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
						<form
							onSubmit={(e) => this.handleSubmit(e)}
							className='card-info__column info__text'
						>
							<CardData
								data={this.state.data}
								symbol={this.state.symbol}
								amount={this.state.amount}
								handleClick={this.handleClick}
							/>
							<button type='submit' className='card-info__btn'>
								Add to cart
							</button>
							<div
								className='card-info__description'
								dangerouslySetInnerHTML={{
									__html: this.state.data.description,
								}}
							/>
						</form>
					</div>
				)}
			</>
		);
	}
}

const Card = (props) => <CardInfo {...props} params={useParams()} />;

export default withRouter(connect(mapStateToProps)(Card));
