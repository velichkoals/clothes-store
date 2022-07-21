import React, { Component } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

class App extends Component {
	render() {
		return (
			<>
				<Header category={this.props.category} />
				<ProductList {...this.props} />
			</>
		);
	}
}

export default App;
