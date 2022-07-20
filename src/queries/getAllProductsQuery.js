import { gql } from '@apollo/client';

export const getAllProductsQuery = gql`
	query {
		category(input: { title: "all" }) {
			name
			products {
				id
			}
		}
	}
`;
