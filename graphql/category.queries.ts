import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			id
			name
			slug
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($input: CreateCategoryInput!) {
		createCategory(createCategoryInput: $input) {
			id
			name
			slug
		}
	}
`;

export const UPDATE_CATEGORY = gql`
	mutation UpdateCategory($input: UpdateCategoryInput!) {
		updateCategory(updateCategoryInput: $input) {
			id
			name
			slug
		}
	}
`;

export const REMOVE_CATEGORY = gql`
	mutation RemoveCategory($id: Int!) {
		removeCategory(id: $id) {
			id
			name
			slug
		}
	}
`;
