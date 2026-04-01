"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AdminCategoriesPage from "@/app/_components/admin-categories";
import { isAdminRole } from "@/lib/roles";
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

		if (!isAdminRole(user?.role)) {
			router.replace("/");
		}
	}, [isAuth, user, router]);

	if (!isAuth || !isAdminRole(user?.role)) {
		return <div>Tekshirilmoqda...</div>;
	}

	return <AdminCategoriesPage />;
}
