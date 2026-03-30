import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
	mutation CreateOrder($createOrderInput: CreateOrderInput!) {
		createOrder(createOrderInput: $createOrderInput) {
			id
			userId
			name
			phone
			region
			district
			address
			comment
			deliveryMethod
			paymentMethod
			deliveryStatus
			paymentStatus
			subtotal
			deliveryFee
			totalAmount
			createdAt
			updatedAt
			items {
				id
				orderId
				productId
				productTitle
				productImage
				orderTimePrice
				quantity
				totalPrice
			}
		}
	}
`;

export const UPDATE_DELIVERY_STATUS = gql`
	mutation UpdateDeliveryStatus($orderId: Int!, $status: DeliveryStatus!) {
		updateDeliveryStatus(orderId: $orderId, status: $status) {
			id
			deliveryStatus
			paymentStatus
			updatedAt
		}
	}
`;

export const UPDATE_PAYMENT_STATUS = gql`
	mutation UpdatePaymentStatus($orderId: Int!, $status: PaymentStatus!) {
		updatePaymentStatus(orderId: $orderId, status: $status) {
			id
			deliveryStatus
			paymentStatus
			updatedAt
		}
	}
`;

export const GET_ORDERS = gql`
	query GetOrders {
		orders {
			id
			userId
			name
			phone
			region
			district
			address
			comment
			deliveryMethod
			paymentMethod
			deliveryStatus
			paymentStatus
			subtotal
			deliveryFee
			totalAmount
			createdAt
			updatedAt
			user {
				id
				name
				phone
				role
				isVerified
			}
			items {
				id
				orderId
				productId
				productTitle
				productImage
				orderTimePrice
				quantity
				totalPrice
				product {
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
				}
			}
		}
	}
`;

export const GET_ORDER_BY_ID = gql`
	query GetOrderById($id: Int!) {
		order(id: $id) {
			id
			userId
			name
			phone
			region
			district
			address
			comment
			deliveryMethod
			paymentMethod
			deliveryStatus
			paymentStatus
			subtotal
			deliveryFee
			totalAmount
			createdAt
			updatedAt
			user {
				id
				name
				phone
				role
				isVerified
			}
			items {
				id
				orderId
				productId
				productTitle
				productImage
				orderTimePrice
				quantity
				totalPrice
				product {
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
				}
			}
		}
	}
`;
