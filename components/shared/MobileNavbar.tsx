"use client";
import React, { ComponentProps } from "react";
import NavMenu, { NavLinks } from "../navMenu";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MobileNavbar() {
	const pathname = usePathname();
	const { t } = useTranslation();
	return (
		// <nav className='fixed bottom-0 left-1/2 z-50 h-16 w-full -translate-x-1/2 border-t bg-background/95 backdrop-blur md:hidden'>
		// 	<div className='mx-auto flex h-full w-full items-center justify-between px-2 bg-red-500'>
		// 		{/* <NavMenu isMobile  /> */}
		// 		<NavigationMenu className='w-full'>
		// 			<NavigationMenuList className='flex w-full items-center justify-between'>
		// 				{NavLinks.map(item => (
		// 					<NavigationMenuItem
		// 						key={item.link}
		// 						className='flex-1 flex justify-center'
		// 					>
		// 						<NavigationMenuLink
		// 							asChild
		// 							className={navigationMenuTriggerStyle()}
		// 						>
		// 							<Link
		// 								href={item.link}
		// 								className={cn(
		// 									"flex flex-col items-center justify-center gap-1 w-full",
		// 									pathname === item.link && "text-primary",
		// 								)}
		// 							>
		// 								{item.icon && <item.icon size={20} />}
		// 								<span className='text-xs'>{t(item.titleKey)}</span>
		// 							</Link>
		// 						</NavigationMenuLink>
		// 					</NavigationMenuItem>
		// 				))}
		// 			</NavigationMenuList>
		// 		</NavigationMenu>
		// 	</div>
		// </nav>
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
			</div>
		</nav>
	);
}
