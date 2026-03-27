import type { Metadata } from "next";

import { notFound } from "next/navigation";

import ProductDetailView from "@/components/sections/ProductDetailView";
import { createSeoMetadata } from "@/config/seo.config";
import { getProductBySlug, hitProducts, slugifyProduct } from "@/mockInfo/data";
import ProductSection from "@/components/sections/Products";

export function generateStaticParams() {
	return hitProducts.map(product => ({
		slug: slugifyProduct(product.title),
	}));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		return createSeoMetadata({
			title: "Mahsulot topilmadi",
			description: "So'ralgan mahsulot tafsiloti topilmadi.",
			path: `/product/detail/${slug}`,
			noIndex: true,
		});
	}

	return createSeoMetadata({
		title: product.title,
		description:
			product.shortDescription ||
			`${product.title} narxi, bo'lib to'lash shartlari va asosiy xususiyatlari bilan tanishing.`,
		path: `/product/detail/${slug}`,
		image: product.images[0] ?? "/logo.png",
		keywords: [
			product.brand ?? "",
			product.capacity ?? "",
			product.badge ?? "",
			"mahsulot tafsiloti",
		].filter(Boolean),
	});
}

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return (
		<>
			<ProductDetailView product={product} />;
		</>
	);
}
