"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import MobileNavbar from "./MobileNavbar";

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const isAuthPage =
		pathname?.startsWith("/auth") || pathname?.startsWith("/admin");

	return (
		<main className='h-screen'>
			<Navbar />
			<main>{children}</main>
			<div className='md:hidden'>
				<MobileNavbar />
			</div>

			{!isAuthPage ? <Footer /> : null}
		</main>
	);
}
