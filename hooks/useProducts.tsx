"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import {
	GET_PRODUCTS,
	GET_PRODUCT_BY_SLUG,
	GET_CATEGORIES,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	REMOVE_PRODUCT,
} from "@/graphql/product.queries";
import { ICategory, IProduct, IProductSpecification } from "@/type";
import { toast } from "sonner";

export interface ProductMutationInput {
	title: string;
	price: number;
	brand: string;
	categoryId: number;
	code: string;
	stock: number;
	shortDescription: string | null;
	description: string;
	images: string[];
	specifications: IProductSpecification[];
}

type CreateProductMutationInput = Omit<ProductMutationInput, "code"> & {
	code?: string;
};

interface UpdateProductMutationInput extends ProductMutationInput {
	id: number;
}

function getGraphqlErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong";
}

interface GetProductsResponse {
	products: IProduct[];
	categories: ICategory[];
}

export const useProducts = () => {
	const { data, loading, error, refetch } = useQuery<GetProductsResponse>(
		GET_PRODUCTS,
		{
			fetchPolicy: "cache-first",
		},
	);

	return {
		products: data?.products ?? [],
		// categories: data?.categories ?? [],
		loading,
		error,
		refetch,
	};
};

// ---------- GET SINGLE PRODUCT BY SLUG ----------
interface GetProductBySlugResponse {
	productBySlug: IProduct;
}

interface GetProductBySlugVariables {
	slug: string;
}

export const useProduct = (slug: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetProductBySlugResponse,
		GetProductBySlugVariables
	>(GET_PRODUCT_BY_SLUG, {
		variables: { slug },
		skip: !slug,
		fetchPolicy: "cache-first",
	});

	return {
		product: data?.productBySlug ?? null,
		loading,
		error,
		refetch,
	};
};

// ---------- GET CATEGORIES ----------
interface GetCategoriesResponse {
	categories: ICategory[];
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

// ---------- CREATE PRODUCT ----------
interface CreateProductResponse {
	createProduct: IProduct;
}

interface CreateProductVariables {
	input: CreateProductMutationInput;
}

export const useCreateProduct = () => {
	const [createProduct, { loading, error, data }] = useMutation<
		CreateProductResponse,
		CreateProductVariables
	>(CREATE_PRODUCT, {
		refetchQueries: [{ query: GET_PRODUCTS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Mahsulot muvaffaqiyatli qo'shildi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleCreateProduct = async (input: ProductMutationInput) => {
		const sanitizedInput: CreateProductMutationInput = input.code.trim()
			? input
			: {
					title: input.title,
					price: input.price,
					brand: input.brand,
					categoryId: input.categoryId,
					stock: input.stock,
					shortDescription: input.shortDescription,
					description: input.description,
					images: input.images,
					specifications: input.specifications,
				};

		return await createProduct({
			variables: { input: sanitizedInput },
		});
	};

	return {
		createProduct: handleCreateProduct,
		createdProduct: data?.createProduct ?? null,
		loading,
		error,
	};
};

// ---------- UPDATE PRODUCT ----------
interface UpdateProductResponse {
	updateProduct: IProduct;
}

interface UpdateProductVariables {
	input: UpdateProductMutationInput;
}

export const useUpdateProduct = () => {
	const [updateProduct, { loading, error, data }] = useMutation<
		UpdateProductResponse,
		UpdateProductVariables
	>(UPDATE_PRODUCT, {
		refetchQueries: [{ query: GET_PRODUCTS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Mahsulot muvaffaqiyatli yangilandi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleUpdateProduct = async (
		id: number,
		input: ProductMutationInput,
	) => {
		return await updateProduct({
			variables: { input: { id, ...input } },
		});
	};

	return {
		updateProduct: handleUpdateProduct,
		updatedProduct: data?.updateProduct ?? null,
		loading,
		error,
	};
};

// ---------- REMOVE PRODUCT ----------
interface RemoveProductResponse {
	removeProduct: {
		id: number;
	};
}

interface RemoveProductVariables {
	id: number;
}

export const useRemoveProduct = () => {
	const [removeProduct, { loading, error, data }] = useMutation<
		RemoveProductResponse,
		RemoveProductVariables
	>(REMOVE_PRODUCT, {
		refetchQueries: [{ query: GET_PRODUCTS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			toast.success("Mahsulot o'chirildi");
		},
		onError: currentError => {
			toast.error(getGraphqlErrorMessage(currentError));
		},
	});

	const handleRemoveProduct = async (id: number) => {
		return await removeProduct({
			variables: { id },
		});
	};

	return {
		removeProduct: handleRemoveProduct,
		removedProduct: data?.removeProduct ?? null,
		loading,
		error,
	};
};
