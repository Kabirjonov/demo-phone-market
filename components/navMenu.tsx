"use client";
import React, { ComponentProps } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const NavLinks = [
	{
		link: "/",
		titleKey: "nav.home",
		icon: User,
	},
	// {
	// 	link: "/product",
	// 	titleKey: "nav.products",
	// 	icon: ShoppingCart,
	// },

	{
		link: "/catalog",
		titleKey: "nav.catalog",
		icon: ShoppingCart,
	},
	{
		link: "/liked",
		titleKey: "nav.liked",
		icon: Heart,
	},
];
export default function NavMenu(props: ComponentProps<typeof NavigationMenu>) {
	const pathname = usePathname();
	const { t } = useTranslation();

	return (
		<NavigationMenu {...props}>
			<NavigationMenuList className='space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start'>
				{NavLinks.map(item => (
					<NavigationMenuItem key={item.link}>
						<NavigationMenuLink
							asChild
							className={navigationMenuTriggerStyle()}
						>
							<Link
								href={item.link}
								className={cn(
									"flex items-center gap-1",
									pathname === item.link && "text-primary",
								)}
							>
								<item.icon size={20} />
								{t(item.titleKey)}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
