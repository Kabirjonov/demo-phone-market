import Image from "next/image";
import Link from "next/link";
import {
	FaCartShopping,
	FaMagnifyingGlass,
	FaMobileScreenButton,
} from "react-icons/fa6";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navbarData = {
	logo: {
		image: {
			src: "/globe.svg",
			alt: "Market",
		},
		text: {
			title: "Market",
			subtitle: "Smartfon va aksessuarlar",
		},
	},
	links: [
		{ href: "/", label: "Home" },
		{ href: "/products", label: "Products" },
		{ href: "/accessories", label: "Accessories" },
		{ href: "/contact", label: "Contact" },
	],
	searchPlaceholder: "Telefon, quloqchin yoki zaryadlovchi qidiring...",
	cartLabel: "Cart (2)",
};

export default function Navbar() {
	return (
		<header className='border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'>
			<div className='mx-auto flex w-full max-w-[80%] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
					<Link href='/' className='flex items-center gap-3'>
						<div className='flex size-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20'>
							<Image
								src={navbarData.logo.image.src}
								alt={navbarData.logo.image.alt}
								width={28}
								height={28}
								className='size-7'
							/>
						</div>
						<div className='space-y-0.5'>
							<p className='text-base font-semibold tracking-tight text-foreground'>
								{navbarData.logo.text.title}
							</p>
							<p className='text-sm text-muted-foreground'>
								{navbarData.logo.text.subtitle}
							</p>
						</div>
					</Link>

					<div className='flex flex-1 flex-col gap-3 lg:mx-8 lg:max-w-3xl lg:flex-row lg:items-center'>
						<nav className='flex  items-center gap-2'>
							{navbarData.links.map(link => (
								<Button
									size={"sm"}
									key={link.label}
									asChild
									variant='ghost'
									className='justify-start'
								>
									<Link href={link.href}>{link.label}</Link>
								</Button>
							))}
						</nav>

						<div className='flex w-full items-center gap-2 lg:ml-auto lg:max-w-md'>
							<div className='relative w-full'>
								<FaMagnifyingGlass className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									type='search'
									placeholder={navbarData.searchPlaceholder}
									className='pl-9'
								/>
							</div>
							<Button size='icon' variant='outline' aria-label='Qidirish'>
								<FaMagnifyingGlass className='size-4' />
							</Button>
						</div>
					</div>

					<div className='flex items-center gap-2 self-end lg:self-auto'>
						<ModeToggle />
						<Button asChild variant='outline' className='gap-2'>
							<Link href='/cart'>
								<FaCartShopping className='size-4' />
								<span>{navbarData.cartLabel}</span>
							</Link>
						</Button>
						<Button asChild variant='default' className='gap-2'>
							<Link href='/products'>
								<FaMobileScreenButton className='size-4' />
								<span>Buyurtma berish</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
