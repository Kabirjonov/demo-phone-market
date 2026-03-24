import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Mahsulotlar",
	description:
		"Texnool mahsulotlar sahifasida eng ommabop texnikalar, foydali xaridlar va tavsiya etilgan mahsulotlarni toping.",
	path: "/product",
	keywords: ["mahsulotlar", "texnika mahsulotlari", "online shop"],
});

export default function ProductLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
