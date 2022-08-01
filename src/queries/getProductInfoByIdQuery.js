import { gql } from '@apollo/client';
import { client } from '../index';

export function getProductInfoByIdQuery(id) {
	return client.query({
		query: gql`
query {
product(id: "${id}") {
 	id
	name 
	gallery
	description
	attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
  prices {
    currency {
      label
      symbol
    }
    amount
  }
    brand
	}
}
`,
	});
}
