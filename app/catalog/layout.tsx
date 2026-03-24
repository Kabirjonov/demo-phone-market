import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Katalog",
	description:
		"Texnool katalogida smartfonlar, televizorlar, audio qurilmalar va boshqa texnikalarni bo'limlar kesimida ko'ring.",
	path: "/catalog",
	keywords: ["katalog", "texnika katalogi", "smartfon katalogi"],
});

export default function CatalogLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
