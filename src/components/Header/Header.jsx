import React, { Component } from 'react';
import { ReactComponent as VSF } from '../../assets/VSF.svg';
import { ReactComponent as Cart } from '../../assets/empty-cart.svg';

import './Header.scss';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			currencyVal: '$',
			isActive: false,
		};
		this.toggleActive = this.toggleActive.bind(this);
	}

	showCurrency(currency) {
		this.setState({
			currencyVal: currency,
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
					<div className='header__section__item'>ALL</div>
					<div className='header__section__item'>CLOTHES</div>
					<div className='header__section__item'>TECH</div>
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
							value={this.state.currencyVal}
							readOnly={true}
							onMouseEnter={this.toggleActive}
						/>
						<div className='converter__options'>
							<div
								className='converter__item'
								onClick={() => this.showCurrency('$')}
							>
								$ USD
							</div>
							<div
								className='converter__item'
								onClick={() => this.showCurrency('€')}
							>
								€ EUR
							</div>
							<div
								className='converter__item'
								onClick={() => this.showCurrency('¥')}
							>
								¥ JPY
							</div>
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

export default Header;
