"use client";
import { NavLinks } from "../navMenu";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSessionStore } from "@/store/useSession.store";
import { ListOrderedIcon, User } from "lucide-react";

export default function MobileNavbar() {
	const pathname = usePathname();
	const { t } = useTranslation();
	const { isAuth } = useSessionStore();
	return (
		<nav className='fixed bottom-0 left-1/2 z-50 h-16 w-full -translate-x-1/2 border-t bg-background/95 backdrop-blur md:hidden'>
			<div className='mx-auto flex h-full w-full '>
				{NavLinks.map(item => (
					<Link
						key={item.link}
						href={item.link}
						className={cn(
							"flex flex-1 flex-col items-center justify-center gap-1",
							pathname === item.link ? "text-primary" : "text-muted-foreground",
						)}
					>
						{item.icon && <item.icon size={20} />}
						<span className='hidden sm:block text-xs '>{t(item.titleKey)}</span>
					</Link>
				))}
				{isAuth && (
					<Link
						href='/profile'
						className={cn(
							"flex flex-1 flex-col items-center justify-center gap-1",
							pathname === "/profile"
								? "text-primary"
								: "text-muted-foreground",
						)}
					>
						<User size={20} />
						<span className='hidden sm:block text-xs'>{t("nav.profile")}</span>
					</Link>
				)}
				<Link
					href='/orders'
					className={cn(
						"flex flex-1 flex-col items-center justify-center gap-1",
						pathname === "/orders" ? "text-primary" : "text-muted-foreground",
					)}
				>
					<ListOrderedIcon size={20} />
					<span className='hidden sm:block text-xs'>{t("nav.myOrders")}</span>
				</Link>
			</div>
		</nav>
	);
}
