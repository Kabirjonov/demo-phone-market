"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import ProductCard from "@/components/cards/product-card";
import ProductCardSkeleton from "@/components/loadings/product-card-skeleton";
import { useProducts } from "@/hooks/useProducts";

export default function ProductPage() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("search")?.trim().toLowerCase() ?? "";
	const { ref, inView } = useInView({
		rootMargin: "320px 0px",
	});
	const { products, loading, loadingMore, error, hasMore, loadMore } =
		useProducts();

	const filteredProducts = useMemo(() => {
		if (!searchQuery) {
			return products;
		}

		return products.filter(product => {
			const haystack = [
				product.title,
				product.brand,
				product.code,
				product.shortDescription,
				product.description,
				product.category?.name,
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			return haystack.includes(searchQuery);
		});
	}, [products, searchQuery]);

	useEffect(() => {
		if (!inView) {
			return;
		}

		void loadMore();
	}, [inView, loadMore]);

	return (
		<section className='py-10'>
			<div className='container mx-auto px-4'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold'>
						{searchQuery ? `Qidiruv: ${searchParams.get("search")}` : "Barcha mahsulotlar"}
					</h1>
					{searchQuery ? (
						<p className='mt-2 text-sm text-muted-foreground'>
							{filteredProducts.length} ta mahsulot topildi
						</p>
					) : null}
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
					{loading && products.length === 0
						? Array.from({ length: 12 }).map((_, index) => (
								<ProductCardSkeleton key={`product-skeleton-${index}`} />
							))
						: filteredProducts.map(product => (
								<ProductCard key={product.id} product={product} />
							))}

					{loadingMore
						? Array.from({ length: 4 }).map((_, index) => (
								<ProductCardSkeleton key={`product-more-skeleton-${index}`} />
							))
						: null}
				</div>

				{!loading && error ? (
					<p className='mt-6 text-sm text-red-500'>
						Mahsulotlarni yuklashda xatolik yuz berdi.
					</p>
				) : null}

				{!loading && !error && filteredProducts.length === 0 ? (
					<p className='mt-6 text-sm text-muted-foreground'>
						Siz qidirgan so&apos;rov bo&apos;yicha mahsulot topilmadi.
					</p>
				) : null}

				{hasMore ? (
					<div
						ref={ref}
						className='h-10 w-full'
						aria-hidden='true'
					/>
				) : null}
			</div>
		</section>
	);
}
