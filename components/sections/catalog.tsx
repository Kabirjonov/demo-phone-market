"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const catalogPreviewItems = [
	{
		id: 1,
		title: "Aksiyalar va chegirmalar",
		href: "/promotions/ustamasiz-muddatli-tolov-0012",
		image: "/products/product-1.webp",
		accent: "from-amber-50 to-orange-100",
	},
	{
		id: 2,
		title: "Smartfonlar",
		href: "/catalog",
		image: "/products/product-1.2.webp",
		accent: "from-slate-50 to-zinc-100",
	},
	{
		id: 3,
		title: "Havo sovutgichlar",
		href: "/catalog",
		image: "/products/product-1.3.webp",
		accent: "from-cyan-50 to-sky-100",
	},
	{
		id: 4,
		title: "Changyutgichlar",
		href: "/catalog",
		image: "/products/product-1.4.webp",
		accent: "from-slate-50 to-blue-100",
	},
	{
		id: 5,
		title: "Muzlatgichlar",
		href: "/catalog",
		image: "/products/product-1.webp",
		accent: "from-lime-50 to-emerald-100",
	},
	{
		id: 6,
		title: "Noutbuklar",
		href: "/catalog",
		image: "/products/product-1.2.webp",
		accent: "from-zinc-50 to-slate-100",
	},
	{
		id: 7,
		title: "Televizorlar",
		href: "/catalog",
		image: "/products/product-1.3.webp",
		accent: "from-fuchsia-50 to-rose-100",
	},
	{
		id: 8,
		title: "Qahva mashinalari",
		href: "/catalog",
		image: "/products/product-1.4.webp",
		accent: "from-orange-50 to-amber-100",
	},
];

export default function CatalogSection() {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleScroll = (direction: "left" | "right") => {
		const container = scrollRef.current;

		if (!container) return;

		container.scrollBy({
			left: direction === "left" ? -320 : 320,
			behavior: "smooth",
		});
	};

	return (
		<section className='py-8'>
			<div className='relative'>
				<button
					type='button'
					aria-label='Chapga surish'
					onClick={() => handleScroll("left")}
					className='absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-lg backdrop-blur transition hover:bg-white lg:flex'
				>
					<ChevronLeft size={22} />
				</button>

				<div
					ref={scrollRef}
					className='flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
				>
					{catalogPreviewItems.map(item => (
						<Link
							key={item.id}
							href={item.href}
							className={`group relative min-w-[220px] flex-1 snap-start overflow-hidden rounded-[24px] bg-gradient-to-br ${item.accent} p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)] sm:min-w-[240px] lg:min-w-[210px]`}
						>
							<div className='relative z-10 flex h-full min-h-[126px] flex-col justify-between'>
								<h2 className='max-w-[150px] text-xl font-semibold leading-7 text-slate-800'>
									{item.title}
								</h2>

								<div className='ml-auto mt-4 flex w-full justify-end'>
									<Image
										src={item.image}
										alt={item.title}
										width={120}
										height={120}
										className='h-[92px] w-auto object-contain transition duration-300 group-hover:scale-105'
									/>
								</div>
							</div>

							<div className='absolute -bottom-8 right-6 h-20 w-20 rounded-full bg-white/35 blur-2xl' />
						</Link>
					))}
				</div>

				<button
					type='button'
					aria-label='O‘ngga surish'
					onClick={() => handleScroll("right")}
					className='absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-lg backdrop-blur transition hover:bg-white lg:flex'
				>
					<ChevronRight size={22} />
				</button>
			</div>
		</section>
	);
}
