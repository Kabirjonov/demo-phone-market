import { gql } from "@apollo/client";

export const GET_Products = gql`
	query GetUsers {
		products {
			title
			price
		}
	}
`;

export const CREATE_Products = gql`
	query GetUsers {
		products {
			title
			price
		}
	}
`;

export const GET_PRODUCTS = gql`
	query GetProducts {
		products {
			id
			title
			price
			slug
			brand
			code
			stock
			shortDescription
			description
			images
			specifications {
				label
				value
				group
			}
			category {
				id
				name
				slug
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			id
			name
			slug
		}
	}
`;

export const CREATE_PRODUCT = gql`
	mutation CreateProduct($input: CreateProductInput!) {
		createProduct(createProductInput: $input) {
			id
			title
			price
			code
			stock
			slug
			brand
			shortDescription
			description
			images
			specifications {
				label
				value
				group
			}
			category {
				id
				name
				slug
			}
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation UpdateProduct($id: Int!, $input: UpdateProductInput!) {
		updateProduct(id: $id, updateProductInput: $input) {
			id
			title
			price
			code
			stock
			slug
			brand
			shortDescription
			description
			images
			specifications {
				label
				value
				group
			}
			category {
				id
				name
				slug
			}
		}
	}
`;

export const REMOVE_PRODUCT = gql`
	mutation RemoveProduct($id: Int!) {
		removeProduct(id: $id) {
			id
		}
	}
`;
