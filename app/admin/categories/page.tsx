"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdminCategoriesPage from "@/app/_components/admin-categories";
import { useSessionStore } from "@/store/useSession.store";

export default function CategoriesPage() {
	const router = useRouter();
	const user = useSessionStore(state => state.user);
	const isAuth = useSessionStore(state => state.isAuth);

	useEffect(() => {
		if (!isAuth) {
			router.replace("/auth");
			return;
		}

		if (user?.role !== "admin") {
			router.replace("/");
		}
	}, [isAuth, user, router]);

	if (!isAuth || user?.role !== "admin") {
		return <div>Tekshirilmoqda...</div>;
	}

	return <AdminCategoriesPage />;
}
