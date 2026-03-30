import type { Metadata } from "next";
import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	return createSeoMetadata({
		title: "Katalog tafsiloti",
		description:
			"Katalog ichidagi mahsulot yoki bo'lim tafsilotlarini Texnool saytida ko'ring.",
		path: `/catalog/${slug}`,
		keywords: ["katalog tafsiloti", "mahsulot tafsiloti", slug],
	});
}

export default function CatalogSlugLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
