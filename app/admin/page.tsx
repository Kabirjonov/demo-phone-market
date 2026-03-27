"use client";

import { useSessionStore } from "@/store/useSession.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminComponent from "../_components/admin";

export default function AdminPage() {
	const router = useRouter();
	const user = useSessionStore(state => state.user);
	const isAuth = useSessionStore(state => state.isAuth);

	// useEffect(() => {
	// 	if (!isAuth) {
	// 		router.replace("/auth");
	// 		return;
	// 	}

	// 	if (user?.role !== "admin") {
	// 		router.replace("/");
	// 	}
	// }, [isAuth, user, router]);

	// if (!isAuth || user?.role !== "admin") {
	// 	return <div>Checking...</div>;
	// }

	return <AdminComponent />;
}
