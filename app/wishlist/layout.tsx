import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Wishlist",
	description:
		"Foydalanuvchi wishlist sahifasi. Bu sahifa qidiruv tizimlari uchun indekslanmaydi.",
	path: "/wishlist",
	noIndex: true,
});

export default function WishlistLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
