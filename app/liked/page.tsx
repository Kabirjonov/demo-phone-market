"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/cards/product-card";
import { hitProducts } from "@/mockInfo/data";
import { IProduct } from "@/type";
import {
	getLikedProductIds,
	likedProductsUpdatedEvent,
} from "@/lib/liked-products";

export default function LikedPage() {
	const [likedProducts, setLikedProducts] = useState<IProduct[]>([]);

	useEffect(() => {
		const syncLikedProducts = () => {
			const likedIds = getLikedProductIds();
			const likedSet = new Set(likedIds);
			setLikedProducts(hitProducts.filter(product => likedSet.has(product.id)));
		};

		syncLikedProducts();
		window.addEventListener("storage", syncLikedProducts);
		window.addEventListener(likedProductsUpdatedEvent, syncLikedProducts);

		return () => {
			window.removeEventListener("storage", syncLikedProducts);
			window.removeEventListener(likedProductsUpdatedEvent, syncLikedProducts);
		};
	}, []);

	return (
		<section className='py-40'>
			<div className='container mx-auto px-4'>
				<h1 className='mb-8 text-3xl font-bold'>Saqlangan mahsulotlar</h1>

				{likedProducts.length === 0 ? (
					<div className='rounded-2xl border border-dashed p-8 text-center'>
						<p className='mb-3 text-lg font-medium'>
							Hozircha saqlangan mahsulot yo&apos;q
						</p>
						<Link href='/product' className='text-primary hover:underline'>
							Mahsulotlarni ko&apos;rish
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
