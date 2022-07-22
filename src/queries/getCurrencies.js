import { gql } from '@apollo/client';
import { client } from '../index';

export function getCurrencies() {
	return client.query({
		query: gql`
			query {
				currencies {
					label
					symbol
				}
			}
		`,
	});
}
