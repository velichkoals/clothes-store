import { gql } from '@apollo/client';
import { client } from '../index';

export function getProductsQuery(category) {
	return client.query({
		query: gql`
			query {
				category(input: { title: "${category}" }) {
					name
					products {
						id
					}
				}
			}
		`,
	});
}
