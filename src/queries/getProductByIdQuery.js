import { gql } from '@apollo/client';
import { client } from '../index';

export function getProductByIdQuery(id) {
	return client.query({
		query: gql`
	query {
		product(id: "${id}") {
			name
			inStock
			gallery
  prices {
    currency {
      label
      symbol
    }
    amount
  }
		}
	}
`,
	});
}
