import type { Metadata } from "next";

import { createSeoMetadata } from "@/config/seo.config";
import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";

import CheckoutPageClient from "./checkout-page-client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);

	return createSeoMetadata({
		title: dictionary.checkout?.seo?.title || "Checkout",
		description:
			dictionary.checkout?.seo?.description ||
			"Tanlangan mahsulot uchun buyurtma rasmiylashtirish sahifasi.",
		path: `/checkout/${slug}`,
		noIndex: true,
	});
}

export default async function CheckoutPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return <CheckoutPageClient slug={slug} />;
}
