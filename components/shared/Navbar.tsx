"use client";
import { Button } from "@/components/ui/button";
import { NavigationSheet } from "@/components/navigation-sheet";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

import { useTheme } from "next-themes";
import NavMenu from "../navMenu";
import Link from "next/link";

const Navbar = () => {
	const { theme } = useTheme();
	return (
		<nav className='fixed inset-x-4 top-6 z-50 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background'>
			<div className='mx-auto flex h-full items-center justify-between px-4'>
				{/* <Logo /> */}
				<div className='relative h-10 w-24 sm:h-12 sm:w-28 md:h-14 md:w-32'>
					<Link href={"/"}>
						<Image
							alt='logo'
							src={theme === "dark" ? "/logo2.png" : "/logo.png"}
							fill
							className='object-contain'
							priority
						/>
					</Link>
				</div>

				{/* Desktop Menu */}
				{/* <NavMenu /> */}
				<NavMenu className='hidden md:block' />

				<div className='flex items-center gap-3'>
					<ModeToggle />
					{/* <Button
						className='hidden rounded-full sm:inline-flex'
						variant='outline'
					>
						Sign In
					</Button> */}
					<div className='flex items-center gap-0.5'>
						<Input placeholder='Search' />
						<Button size={"icon"}>
							<Search />
						</Button>
					</div>

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
