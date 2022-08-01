import React, { Component } from 'react';
import CardData from '../../CardData/CardData';
import { ReactComponent as LeftArrow } from '../../../assets/left-arrow.svg';
import { ReactComponent as RightArrow } from '../../../assets/right-arrow.svg';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../ProductCard/ProductCard';

import './CartItem.scss';

class CartItem extends Component {
	constructor() {
		super();
		this.state = {
			currentPhoto: 0,
		};
		this.nextImg = this.nextImg.bind(this);
		this.prevImg = this.prevImg.bind(this);
	}

	nextImg() {
		const galleryLength = this.props.item.data.gallery.length;

		if (galleryLength > 1 && this.state.currentPhoto !== galleryLength - 1) {
			this.setState({
				currentPhoto: this.state.currentPhoto + 1,
			});
		}
	}

	prevImg() {
		const galleryLength = this.props.item.data.gallery.length;

		if (galleryLength > 1 && this.state.currentPhoto !== 0) {
			this.setState({
				currentPhoto: this.state.currentPhoto - 1,
			});
		}
	}

	render() {
		const item = this.props.item;

		return (
			<div className='cart__item' key={this.props.id}>
				<hr className='cart__item__line' />
				<div className='cart__item__info__wrapper'>
					<CardData
						data={item.data}
						symbol={item.symbol}
						amount={item.amount}
						selected={item.selected}
					/>
					<div className='cart__item__column'>
						<div className='cart__item__slider'>
							<img
								src={item.data.gallery[this.state.currentPhoto]}
								alt='cart-img'
								className='cart__item__img'
							/>
							<LeftArrow
								className='cart__item__arrow cart__item__arrow_left'
								onClick={this.prevImg}
							/>
							<RightArrow
								className='cart__item__arrow cart__item__arrow_right'
								onClick={this.nextImg}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(CartItem);
