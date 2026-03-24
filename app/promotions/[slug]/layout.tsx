import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Aksiya tafsiloti",
	description:
		"Texnool aksiyasi haqida to'liq ma'lumot, amal qilish muddati va aksiyadagi mahsulotlar ro'yxati.",
	path: "/promotions",
	keywords: ["aksiya tafsiloti", "chegirma tafsiloti"],
});

export default function PromotionSlugLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
