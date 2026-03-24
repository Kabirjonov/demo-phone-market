"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const isAuthPage = pathname?.startsWith("/auth");

	return (
		<main className='h-screen'>
			<Navbar />
			<main>{children}</main>
			{!isAuthPage ? <Footer /> : null}
		</main>
	);
}
