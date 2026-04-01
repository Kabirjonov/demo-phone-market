"use client";

import { useSessionStore } from "@/store/useSession.store";
import { isAdminRole } from "@/lib/roles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminComponent from "../_components/admin";

export default function AdminPage() {
	const router = useRouter();
	const { t } = useTranslation();
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
		return <div>{t("admin.page.checking")}</div>;
	}

	return <AdminComponent />;
}
