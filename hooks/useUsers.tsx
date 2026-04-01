"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import api from "@/http/api";

export type AdminUser = {
	id: number;
	name: string;
	phone: string;
	role: string;
	isVerified: boolean;
	verifyCode?: string;
};

type UpdateUserInput = {
	role?: string;
	name?: string;
	phone?: string;
	isVerified?: boolean;
};

type ApiErrorResponse = {
	message?: string;
};

function getErrorMessage(error: unknown) {
	if (error instanceof AxiosError) {
		return (
			(error.response?.data as ApiErrorResponse | undefined)?.message ||
			"Something went wrong"
		);
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong";
}

export function useUsers() {
	const query = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await api.get<AdminUser[]>("/api/users");

			return response.data;
		},
	});

	return {
		users: query.data ?? [],
		loading: query.isPending,
		error: query.error,
		refetch: query.refetch,
	};
}

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async ({
			id,
			input,
		}: {
			id: number;
			input: UpdateUserInput;
		}) => {
			const response = await api.patch<AdminUser>(`/api/users/${id}`, input);
			return response.data;
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("Foydalanuvchi yangilandi");
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});

	return {
		updateUser: async (id: number, input: UpdateUserInput) =>
			await mutation.mutateAsync({ id, input }),
		updatedUser: mutation.data ?? null,
		loading: mutation.isPending,
		error: mutation.error,
	};
}

export function useRemoveUser() {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: number) => {
			await api.delete(`/api/users/${id}`);
			return id;
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["users"] });
			toast.success("Foydalanuvchi o'chirildi");
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});

	return {
		removeUser: async (id: number) => await mutation.mutateAsync(id),
		removedUserId: mutation.data ?? null,
		loading: mutation.isPending,
		error: mutation.error,
	};
}
