import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.scss';

export const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route
						path='/all'
						element={<App category='all' title='All products' />}
					/>
					<Route
						path='/clothes'
						element={<App category='clothes' title='Clothes' />}
					/>
					<Route path='/tech' element={<App category='tech' title='Tech' />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</ApolloProvider>
);
