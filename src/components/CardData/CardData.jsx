import React, { Component } from 'react';

import './CardData.scss';

class CardData extends Component {
	constructor() {
		super();
		this.state = {
			isCart: false,
		};
	}

	componentDidMount() {
		if (window.location.pathname === '/cart') {
			this.setState({
				isCart: true,
			});
		}
	}

	render() {
		return (
			<div>
				<div className='card-info__title'>{this.props.data.name}</div>
				<div className='card-info__brand'>{this.props.data.brand}</div>
				{this.props.data.attributes?.map((attribute) => (
					<div className='card-info__option' key={attribute.id}>
						<div className='card-info__option__title'>{attribute.name}:</div>
						<div className='card-info__option__wrapper'>
							{attribute.type === 'text'
								? attribute.items?.map((item) => (
										<div key={item.id} className='card-info__option__item'>
											<input
												onClick={(e) => this.props.handleClick(e, item.value)}
												type='radio'
												className={`card-info__input`}
												id={`${item.id} ${attribute.id}`}
												name={attribute.name}
											/>
											<label
												htmlFor={`${item.id} ${attribute.id}`}
												className={`${
													this.state.isCart === true
														? this.props.selected.some(
																(el) =>
																	el.value === item.value &&
																	el.name === attribute.name
														  )
															? 'selected-prop'
															: 'item__prop'
														: null
												}`}
											>
												{item.value}
											</label>
										</div>
								  ))
								: null}
							{attribute.type === 'swatch'
								? attribute.items?.map((item) => (
										<div
											key={item.id}
											className='card-info__option__item-swatch'
											style={{
												backgroundColor: `${item.value}`,
											}}
										>
											<input
												onClick={(e) => this.props.handleClick(e, item.value)}
												type='radio'
												id={item.id}
												name={attribute.name}
											/>
											<label
												htmlFor={item.id}
												className={`${
													this.state.isCart === true
														? this.props.selected.some(
																(el) => el.value === item.value
														  )
															? 'selected-prop__swatch'
															: 'item__prop'
														: null
												}`}
											></label>
										</div>
								  ))
								: null}
						</div>
					</div>
				))}

				<div className='card-info__price'>
					<div className='card-info__option__title'>Price:</div>
					<div className='card-info__option__price'>
						{this.props.symbol} {this.props.amount}
					</div>
				</div>
			</div>
		);
	}
}

export default CardData;
