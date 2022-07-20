import React, { Component } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

class App extends Component {
	render() {
		return (
			<>
				<Header />
				<ProductList />
			</>
		);
	}
}

export default App;
