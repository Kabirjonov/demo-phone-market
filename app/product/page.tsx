"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import ProductCard from "@/components/cards/product-card";
import ProductCardSkeleton from "@/components/loadings/product-card-skeleton";
import { useProducts } from "@/hooks/useProducts";

export default function ProductPage() {
	const { ref, inView } = useInView({
		rootMargin: "320px 0px",
	});
	const { products, loading, loadingMore, error, hasMore, loadMore } =
		useProducts();

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
					<h1 className='text-3xl font-bold'>Barcha mahsulotlar</h1>
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
					{loading && products.length === 0
						? Array.from({ length: 12 }).map((_, index) => (
								<ProductCardSkeleton key={`product-skeleton-${index}`} />
							))
						: products.map(product => (
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
