"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import {
	CREATE_ORDER,
	GET_ORDER_BY_ID,
	GET_MY_ORDERS,
	GET_ORDERS,
	UPDATE_DELIVERY_STATUS,
	UPDATE_PAYMENT_STATUS,
} from "@/graphql/order.queries";
import {
	DeliveryStatus,
	ICreateOrderInput,
	IOrder,
	PaymentStatus,
} from "@/type";

interface GetOrdersResponse {
	orders: IOrder[];
}

interface GetMyOrdersResponse {
	myOrders: IOrder[];
}

interface GetOrderResponse {
	order: IOrder;
}

interface GetOrderVariables {
	id: number;
}

interface CreateOrderResponse {
	createOrder: IOrder;
}

interface CreateOrderVariables {
	createOrderInput: ICreateOrderInput;
}

interface UpdateDeliveryStatusResponse {
	updateDeliveryStatus: IOrder;
}

interface UpdateDeliveryStatusVariables {
	orderId: number;
	status: DeliveryStatus;
}

interface UpdatePaymentStatusResponse {
	updatePaymentStatus: IOrder;
}

interface UpdatePaymentStatusVariables {
	orderId: number;
	status: PaymentStatus;
}

export const useOrders = (enabled = true) => {
	const { data, loading, error, refetch } = useQuery<GetOrdersResponse>(
		GET_ORDERS,
		{
			fetchPolicy: "cache-and-network",
			skip: !enabled,
		},
	);

	return {
		orders: data?.orders ?? [],
		loading,
		error,
		refetch,
	};
};

export const useOrder = (id: number | null, enabled = true) => {
	const { data, loading, error, refetch } = useQuery<
		GetOrderResponse,
		GetOrderVariables
	>(GET_ORDER_BY_ID, {
		variables: { id: id ?? 0 },
		skip: !enabled || !id,
		fetchPolicy: "cache-and-network",
	});

	return {
		order: data?.order ?? null,
		loading,
		error,
		refetch,
	};
};

export const useMyOrders = (userId: number | null, enabled = true) => {
	const { data, loading, error, refetch } = useQuery<
		GetMyOrdersResponse,
		{ userId: number }
	>(GET_MY_ORDERS, {
		variables: { userId: userId ?? 0 },
		skip: !enabled || !userId,
		fetchPolicy: "cache-and-network",
	});
	console.log("My Orders Data:", data);
	return {
		orders: data?.myOrders ?? [],
		loading,
		error,
		refetch,
	};
};

function getGraphqlErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong";
}

export const useCreateOrder = () => {
	const [createOrder, { loading, error, data }] = useMutation<
		CreateOrderResponse,
		CreateOrderVariables
	>(CREATE_ORDER, {
		refetchQueries: [{ query: GET_ORDERS }],
		awaitRefetchQueries: true,
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleCreateOrder = async (createOrderInput: ICreateOrderInput) => {
		const result = await createOrder({
			variables: { createOrderInput },
		});

		return result.data?.createOrder ?? null;
	};

	return {
		createOrder: handleCreateOrder,
		createdOrder: data?.createOrder ?? null,
		loading,
		error,
	};
};

export const useUpdateDeliveryStatus = () => {
	const [updateDeliveryStatus, { loading, error, data }] = useMutation<
		UpdateDeliveryStatusResponse,
		UpdateDeliveryStatusVariables
	>(UPDATE_DELIVERY_STATUS, {
		refetchQueries: [GET_ORDERS, GET_ORDER_BY_ID],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Yetkazish statusi yangilandi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleUpdateDeliveryStatus = async (
		orderId: number,
		status: DeliveryStatus,
	) => {
		const result = await updateDeliveryStatus({
			variables: { orderId, status },
		});

		return result.data?.updateDeliveryStatus ?? null;
	};

	return {
		updateDeliveryStatus: handleUpdateDeliveryStatus,
		updatedOrder: data?.updateDeliveryStatus ?? null,
		loading,
		error,
	};
};

export const useUpdatePaymentStatus = () => {
	const [updatePaymentStatus, { loading, error, data }] = useMutation<
		UpdatePaymentStatusResponse,
		UpdatePaymentStatusVariables
	>(UPDATE_PAYMENT_STATUS, {
		refetchQueries: [GET_ORDERS, GET_ORDER_BY_ID],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("To'lov statusi yangilandi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleUpdatePaymentStatus = async (
		orderId: number,
		status: PaymentStatus,
	) => {
		const result = await updatePaymentStatus({
			variables: { orderId, status },
		});

		return result.data?.updatePaymentStatus ?? null;
	};

	return {
		updatePaymentStatus: handleUpdatePaymentStatus,
		updatedOrder: data?.updatePaymentStatus ?? null,
		loading,
		error,
	};
};
