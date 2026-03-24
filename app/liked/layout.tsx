import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Saqlangan mahsulotlar",
	description:
		"Foydalanuvchi saqlagan mahsulotlar ro'yxati. Bu sahifa qidiruv tizimlari uchun indekslanmaydi.",
	path: "/liked",
	noIndex: true,
});

export default function LikedLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
