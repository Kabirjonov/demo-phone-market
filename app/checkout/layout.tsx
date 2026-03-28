import type { Metadata } from "next";
import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";
import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);

	return createSeoMetadata({
		title: dictionary.checkout?.seo?.title || "Checkout",
		description:
			dictionary.checkout?.seo?.description ||
			"Buyurtma rasmiylashtirish sahifasi.",
		path: "/checkout",
		noIndex: true,
	});
}

export default function CheckoutLayout({ children }: { children: ReactNode }) {
	return children;
}
