import React, { Component } from 'react';
import { ReactComponent as VSF } from '../../assets/VSF.svg';
import { ReactComponent as Cart } from '../../assets/empty-cart.svg';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import { connect } from 'react-redux';
import { getCurrencies } from '../../queries/getCurrencies';
import { mapStateToProps } from '../ProductCard/ProductCard';
import { getCurrencyAction } from '../../store/currency/actionCreators';

import './Header.scss';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			currency: '',
			currencies: [],
			isActive: false,
		};
		this.toggleActive = this.toggleActive.bind(this);
	}

	componentDidMount() {
		getCurrencies().then((response) => {
			this.setState({
				currencies: response.data.currencies,
				currency: this.props.currency,
			});
		});
		localStorage.setItem('category', this.props.category);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.currency !== prevState.currency) {
			store.dispatch(getCurrencyAction(this.state.currency));
		}
		if (prevState.category !== this.props.category) {
			localStorage.setItem('category', this.props.category);
		}
	}

	showCurrency(currency) {
		this.setState({
			currency: currency,
		});
	}
	toggleActive() {
		this.setState({
			isActive: !this.state.isActive,
		});
	}

	render() {
		return (
			<header className='header'>
				<div className='header__section'>
					<Link
						to='/all'
						className={`header__section__item ${
							this.props.category === 'all' ? 'selected' : ''
						}`}
					>
						ALL
					</Link>
					<Link
						to='/clothes'
						className={`header__section__item ${
							this.props.category === 'clothes' ? 'selected' : ''
						}`}
					>
						CLOTHES
					</Link>
					<Link
						to='/tech'
						className={`header__section__item ${
							this.props.category === 'tech' ? 'selected' : ''
						}`}
					>
						TECH
					</Link>
				</div>
				<div className='header__logo'>
					<VSF width='31px' height='30px' />
				</div>
				<div className='header__actions'>
					<div
						className={`header__actions__converter ${
							this.state.isActive ? 'active' : ''
						}`}
						onMouseLeave={this.toggleActive}
					>
						<input
							type='text'
							className={'converter__textBox'}
							value={this.state.currency}
							readOnly={true}
							onMouseEnter={this.toggleActive}
						/>
						<div className='converter__options'>
							{this.state.currencies.map((elem, index) => (
								<div
									key={index}
									className='converter__item'
									onClick={() => this.showCurrency(elem.symbol)}
								>
									{elem.symbol} {elem.label}
								</div>
							))}
						</div>
					</div>
					<div className='header__actions__cart'>
						<Cart width='20px' height='20px' />
					</div>
				</div>
			</header>
		);
	}
}

export default connect(mapStateToProps)(Header);
