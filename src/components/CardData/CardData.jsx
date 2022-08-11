import React, { Component } from 'react';

import './CardData.scss';
import { useParams } from 'react-router-dom';
import { withRouter } from '../../helpers/withRouter';
import { connect } from 'react-redux';
import { mapStateToProps } from '../ProductCard/ProductCard';

class CardData extends Component {
	constructor() {
		super();
		this.state = {
			isCardInfo: true,
		};
	}

	componentDidMount() {
		const params = this.props.params;
		let id = params?.cardId;

		if (window.location.pathname === `/${id}`) {
			this.setState({
				isCardInfo: true,
			});
		} else {
			this.setState({
				isCardInfo: false,
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
													this.state?.isCardInfo === false
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
													!this.state.isCardInfo
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

const Data = (props) => <CardData {...props} params={useParams()} />;

export default withRouter(connect(mapStateToProps)(Data));
