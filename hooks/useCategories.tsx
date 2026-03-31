"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { toast } from "sonner";

import {
	CREATE_CATEGORY,
	GET_CATEGORIES,
	REMOVE_CATEGORY,
	UPDATE_CATEGORY,
} from "@/graphql/category.queries";
import { ICategory } from "@/type";

export interface CategoryMutationInput {
	name: string;
	slug: string;
}

interface UpdateCategoryMutationInput extends CategoryMutationInput {
	id: number;
}

interface GetCategoriesResponse {
	categories: ICategory[];
}

interface CreateCategoryResponse {
	createCategory: ICategory;
}

interface UpdateCategoryResponse {
	updateCategory: ICategory;
}

interface RemoveCategoryResponse {
	removeCategory: ICategory;
}

interface CreateCategoryVariables {
	input: CategoryMutationInput;
}

interface UpdateCategoryVariables {
	input: UpdateCategoryMutationInput;
}

interface RemoveCategoryVariables {
	id: number;
}

function getGraphqlErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong";
}

export const useCategories = () => {
	const { data, loading, error, refetch } = useQuery<GetCategoriesResponse>(
		GET_CATEGORIES,
		{
			fetchPolicy: "cache-first",
		},
	);

	return {
		categories: data?.categories ?? [],
		loading,
		error,
		refetch,
	};
};

export const useCreateCategory = () => {
	const [createCategory, { loading, error, data }] = useMutation<
		CreateCategoryResponse,
		CreateCategoryVariables
	>(CREATE_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Kategoriya muvaffaqiyatli qo'shildi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	return {
		createCategory: async (input: CategoryMutationInput) =>
			await createCategory({
				variables: { input },
			}),
		createdCategory: data?.createCategory ?? null,
		loading,
		error,
	};
};

export const useUpdateCategory = () => {
	const [updateCategory, { loading, error, data }] = useMutation<
		UpdateCategoryResponse,
		UpdateCategoryVariables
	>(UPDATE_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Kategoriya muvaffaqiyatli yangilandi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	return {
		updateCategory: async (id: number, input: CategoryMutationInput) =>
			await updateCategory({
				variables: { input: { id, ...input } },
			}),
		updatedCategory: data?.updateCategory ?? null,
		loading,
		error,
	};
};

export const useRemoveCategory = () => {
	const [removeCategory, { loading, error, data }] = useMutation<
		RemoveCategoryResponse,
		RemoveCategoryVariables
	>(REMOVE_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Kategoriya o'chirildi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	return {
		removeCategory: async (id: number) =>
			await removeCategory({
				variables: { id },
			}),
		removedCategory: data?.removeCategory ?? null,
		loading,
		error,
	};
};
