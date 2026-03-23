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

export const NavLinks = [
	{
		link: "/",
		title: "Home",
		icon: User,
	},
	{
		link: "/product",
		title: "Products",
		icon: ShoppingCart,
	},
	{
		link: "/liked",
		title: "Liked",
		icon: Heart,
	},
];
export default function NavMenu(props: ComponentProps<typeof NavigationMenu>) {
	const pathname = usePathname();

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
								{item.title}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
