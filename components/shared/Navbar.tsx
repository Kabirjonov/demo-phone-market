"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User } from "lucide-react";

import { useTheme } from "next-themes";
import NavMenu from "../navMenu";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { ProductSearch } from "./product-search";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useOrders } from "@/hooks/useOrders";
import { useSessionStore } from "@/store/useSession.store";
import { Input } from "../ui/input";
import { socialLinks } from "./Footer";

const Navbar = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const { isAuth, logout, user } = useSessionStore();
	const isAdmin = user?.role === "admin";
	const { orders } = useOrders(isAdmin);
	const newOrdersCount = orders.filter(
		order => order.deliveryStatus === "NEW",
	).length;

	return (
		<nav className='fixed left-1/2 top-6 z-50 h-16 w-[calc(100%-1rem)] -translate-x-1/2 rounded-full border bg-background/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:w-[calc(100%-2rem)] xl:w-[80%]'>
			<div className='mx-auto flex h-full items-center justify-between px-4'>
				{/* <Logo /> */}
				<div className='relative h-10 w-24 sm:h-12 sm:w-28 md:h-4 md:w-32'>
					<Link href={"/"}>
						<Image
							alt='logo'
							src={theme === "dark" ? "/logo2.png" : "/logo.png"}
							fill
							className='object-contain '
							priority
						/>
					</Link>
				</div>

				{/* Desktop Menu */}
				{/* <NavMenu /> */}
				<NavMenu className='hidden md:block' />

				<div className='flex items-center gap-3'>
					{/* <ModeToggle /> */}
					<LanguageSwitcher />

					<ProductSearch />
					{isAuth ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline'>
									<User />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									{isAdmin ? (
										<>
											<DropdownMenuItem>
												<Link href={"/admin"}>{t("nav.adminPanel")}</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link
													href={"/admin/orders"}
													className='flex w-full items-center justify-between gap-3'
												>
													<span>{t("nav.orders")}</span>
													{newOrdersCount > 0 ? (
														<Badge className='min-w-5 justify-center rounded-full px-1.5'>
															{newOrdersCount}
														</Badge>
													) : null}
												</Link>
											</DropdownMenuItem>
										</>
									) : (
										<>
											{/* <DropdownMenuItem>
												<Link href={"/profile"}>History</Link>
											</DropdownMenuItem> */}
											<DropdownMenuItem>
												<Link href={"/orders"}>{t("nav.myOrders")}</Link>
											</DropdownMenuItem>
										</>
									)}
									<DropdownMenuItem>
										<Link href={"/profile"}>{t("nav.profile")}</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => logout()}
										variant='destructive'
									>
										{t("nav.logout")}
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button variant={"outline"}>
							<Link href={"/auth"}>{t("nav.login")}</Link>
						</Button>
					)}

					{/* Mobile Menu */}
				</div>
			</div>
			<div className='md:hidden block absolute left-1/2 top-full  w-max -translate-x-1/2 rounded-lg bg-background p-4 shadow-lg flex flex-col items-center gap-4 mt-2'>
				{/*search input for mobile */}
				<ProductSearch />
			</div>
		</nav>
	);
};

export default Navbar;
