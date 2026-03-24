import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Katalog tafsiloti",
	description:
		"Katalog ichidagi mahsulot yoki bo'lim tafsilotlarini Texnool saytida ko'ring.",
	path: "/catalog",
	keywords: ["katalog tafsiloti", "mahsulot tafsiloti"],
});

export default function CatalogSlugLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
