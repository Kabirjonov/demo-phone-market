"use client";

import ProductSection from "@/components/sections/Products";
import { useProducts } from "@/hooks/useProducts";

export default function ProductPage() {
	const { products, loading, error } = useProducts();

	return (
		<div>
			<ProductSection
				title='Barcha mahsulotlar'
				products={products}
				loading={loading}
				error={!!error}
				viewAllHref='/product'
			/>
		</div>
	);
}
