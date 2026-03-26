"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const catalogPreviewItems = [
	{
		id: 1,
		title: "Aksiyalar va chegirmalar",
		href: "/promotions/ustamasiz-muddatli-tolov-0012",
		image: "/products/product-1.webp",
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
	return (
		<section className='py-8'>
			<div className='relative'>
				<button
					type='button'
					aria-label='Chapga surish'
					className='catalog-prev absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-lg backdrop-blur transition hover:bg-white lg:flex'
				>
					<ChevronLeft size={22} />
				</button>

				<Swiper
					modules={[Autoplay, Navigation]}
					loop
					speed={800}
					spaceBetween={16}
					slidesPerView={1.2}
					autoplay={{
						delay: 2200,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					navigation={{
						prevEl: ".catalog-prev",
						nextEl: ".catalog-next",
					}}
					breakpoints={{
						640: {
							slidesPerView: 2.2,
						},
						768: {
							slidesPerView: 3.2,
						},
						1024: {
							slidesPerView: 4.2,
						},
						1280: {
							slidesPerView: 6.2,
						},
					}}
					className='!pb-2'
				>
					{catalogPreviewItems.map(item => (
						<SwiperSlide key={item.id}>
							<Link
								href={item.href}
								className={`group relative block overflow-hidden rounded-xl p-4 bg-card shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]`}
							>
								<div className='relative z-10 flex h-full min-h-[126px] flex-col justify-between'>
									<h2 className='max-w-[150px] text-xl font-semibold leading-7 text-foreground'>
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
						</SwiperSlide>
					))}
				</Swiper>

				<button
					type='button'
					aria-label='O‘ngga surish'
					className='catalog-next absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-lg backdrop-blur transition hover:bg-white lg:flex'
				>
					<ChevronRight size={22} />
				</button>
			</div>
		</section>
	);
}
