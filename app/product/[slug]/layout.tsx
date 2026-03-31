import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Mahsulot tafsiloti",
	description:
		"Texnool saytida mahsulot narxi, bo'lib to'lash shartlari va asosiy xususiyatlarini ko'ring.",
	path: "/product",
	keywords: ["mahsulot tafsiloti", "narx", "bo'lib to'lash"],
});

export default function ProductDetailLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
