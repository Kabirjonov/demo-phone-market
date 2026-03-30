"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/cards/product-card";
import ProductCardSkeleton from "@/components/loadings/product-card-skeleton";
import { useProducts } from "@/hooks/useProducts";
import {
	getLikedProductIds,
	likedProductsUpdatedEvent,
} from "@/lib/liked-products";

export default function LikedPage() {
	const { t } = useTranslation();
	const [likedIds, setLikedIds] = useState<string[]>([]);
	const { products, loading } = useProducts();

	useEffect(() => {
		const syncLikedProducts = () => {
			setLikedIds(getLikedProductIds());
		};

		syncLikedProducts();
		window.addEventListener("storage", syncLikedProducts);
		window.addEventListener(likedProductsUpdatedEvent, syncLikedProducts);

		return () => {
			window.removeEventListener("storage", syncLikedProducts);
			window.removeEventListener(likedProductsUpdatedEvent, syncLikedProducts);
		};
	}, []);

	const likedProducts = useMemo(() => {
		const likedSet = new Set(likedIds);
		return products.filter(product => likedSet.has(String(product.id)));
	}, [likedIds, products]);

	return (
		<section className='py-40'>
			<div className='container mx-auto px-4'>
				<h1 className='mb-8 text-3xl font-bold'>{t("likedPage.title")}</h1>

				{loading ? (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
						{Array.from({ length: 5 }).map((_, index) => (
							<ProductCardSkeleton key={`liked-product-skeleton-${index}`} />
						))}
					</div>
				) : likedProducts.length === 0 ? (
					<div className='rounded-2xl border border-dashed p-8 text-center'>
						<p className='mb-3 text-lg font-medium'>
							{t("likedPage.empty")}
						</p>
						<Link href='/product' className='text-primary hover:underline'>
							{t("likedPage.cta")}
						</Link>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
						{likedProducts.map(product => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}
