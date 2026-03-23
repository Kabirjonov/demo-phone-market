import { notFound } from "next/navigation";

import ProductDetailView from "@/components/sections/ProductDetailView";
import { getProductBySlug, hitProducts, slugifyProduct } from "@/mockInfo/data";

export function generateStaticParams() {
	return hitProducts.map(product => ({
		slug: slugifyProduct(product.title),
	}));
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

	return <ProductDetailView product={product} />;
}
