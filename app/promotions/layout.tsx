import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Aksiyalar",
	description:
		"Texnool aksiyalar sahifasida chegirmalar, ustamasiz muddatli to'lov va maxsus takliflarni kuzatib boring.",
	path: "/promotions",
	keywords: ["aksiyalar", "chegirma", "muddatli to'lov", "maxsus takliflar"],
});

export default function PromotionsLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
