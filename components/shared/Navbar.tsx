"use client";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "@/components/navigation-sheet";
import Image from "next/image";
import { Search, User } from "lucide-react";
import { Input } from "../ui/input";

import { useTheme } from "next-themes";
import NavMenu from "../navMenu";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "./mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/useSession.store";

const Navbar = () => {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const { isAuth, logout, user } = useSessionStore();

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

					<div className='hidden md:flex items-center gap-0.5'>
						<Input placeholder={t("nav.searchPlaceholder")} />
						<Button size={"icon"}>
							<Search />
						</Button>
					</div>
					{isAuth ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline'>
									<User />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuGroup>
									{user?.role === "admin" ? (
										<DropdownMenuItem>
											<Link href={"/admin"}>Admin Panel</Link>
										</DropdownMenuItem>
									) : (
										<>
											<DropdownMenuItem>
												<Link href={"/profile"}>Profile</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/profile"}>History</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Link href={"/orders"}>Orders</Link>
											</DropdownMenuItem>
										</>
									)}

									<DropdownMenuItem
										onClick={() => logout()}
										variant='destructive'
									>
										LogOut
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
					<div className='md:hidden'>
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
