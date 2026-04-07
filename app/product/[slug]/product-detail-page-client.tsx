"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import ProductDetailSkeleton from "@/components/loadings/product-detail-skeleton";
import ProductDetailView from "@/components/sections/ProductDetailView";
import { useProduct, useProducts } from "@/hooks/useProducts";

type ProductDetailPageClientProps = {
	slug: string;
};

export default function ProductDetailPageClient({
	slug,
}: ProductDetailPageClientProps) {
	const { t } = useTranslation();
	const { product, loading, error } = useProduct(slug);
	const { products, loading: productsLoading } = useProducts({ limit: 24 });

	if (loading) {
		return <ProductDetailSkeleton />;
	}

	if (error || !product) {
		return (
			<div className='mx-auto max-w-[960px] px-4 pb-16 py-40 text-center sm:px-6 lg:px-10'>
				<h1 className='text-3xl font-semibold text-foreground'>
					{t("productDetail.page.notFoundTitle")}
				</h1>
				<p className='mt-4 text-muted-foreground'>
					{t("productDetail.page.notFoundDescription")}
				</p>
				<Link
					href='/product'
					className='mt-6 inline-block text-primary hover:underline'
				>
					{t("productDetail.page.backToProducts")}
				</Link>
			</div>
		);
	}

	const relatedProducts = products
		.filter(item => item.id !== product.id)
		.slice(0, 5);

	return (
		<ProductDetailView
			categories={[]}
			product={product}
			relatedProducts={productsLoading ? [] : relatedProducts}
		/>
	);
}
