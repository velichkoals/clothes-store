import React, { Component } from 'react';

class Loader extends Component {
	render() {
		return (
			<div className='card-info loading'>
				<span className='card-loader'></span>
			</div>
		);
	}
}

export default Loader;
