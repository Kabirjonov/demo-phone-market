import type { ReactNode } from "react";

import { createSeoMetadata } from "@/config/seo.config";

export const metadata = createSeoMetadata({
	title: "Autherication o'tish",
	description:
		"Foydalanuvchi saqlagan mahsulotlar ro'yxati. Bu sahifa qidiruv tizimlari uchun indekslanmaydi.",
	path: "/auth",
	noIndex: true,
});

export default function AuthLayout({ children }: { children: ReactNode }) {
	return children;
}
