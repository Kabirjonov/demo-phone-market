import type { Metadata } from "next";

import { createSeoMetadata } from "@/config/seo.config";
import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";

import ProductDetailPageClient from "./product-detail-page-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);

	return createSeoMetadata({
		title: dictionary.productDetail?.seo?.title || "Mahsulot tafsiloti",
		description:
			dictionary.productDetail?.seo?.description ||
			"Mahsulot narxi, tavsifi va asosiy xususiyatlari bilan tanishing.",
		path: `/product/${slug}`,
	});
}

export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return <ProductDetailPageClient slug={slug} />;
}
