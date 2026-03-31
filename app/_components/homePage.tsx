"use client";
// import type { Metadata } from "next";

import CatalogSection from "@/components/sections/catalog";
import BrandsSection from "@/components/sections/Brands";
import Hero from "@/components/sections/Hero";
import ProductSection from "@/components/sections/Products";
// import { createSeoMetadata } from "@/config/seo.config";
import { useProducts } from "@/hooks/useProducts";

// export const metadata: Metadata = createSeoMetadata({
// 	title: "Bosh sahifa",
// 	description:
// 		"Texnool bosh sahifasida mashhur mahsulotlar, brendlar va yangi texnologiyalarni bir joyda toping.",
// 	path: "/",
// 	keywords: ["bosh sahifa", "telefon market", "texnool uz"],
// });

export default function HomePage() {
	const { products, loading, error } = useProducts();

	return (
		<div className='min-h-screen bg-background w-[80%] mx-auto'>
			<Hero />
			<CatalogSection />
			<BrandsSection />
			<ProductSection
				// title='Xit savdo'
				products={products}
				loading={loading}
				error={!!error}
				viewAllHref='/products'
			/>
		</div>
	);
}
