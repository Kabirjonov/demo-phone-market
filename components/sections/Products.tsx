"use client";

import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	FaArrowRight,
	FaCartShopping,
	FaMobileScreenButton,
	FaRegMessage,
	FaStar,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import "swiper/css";

type Product = {
	id: number;
	name: string;
	rating: number;
	reviews: string;
	monthlyPrice: string;
	price: string;
	badge: string;
	timer?: string;
	bgClass: string;
	accentClass: string;
};

const products: Product[] = [
	{
		id: 1,
		name: "Samsung Galaxy A56 5G 8/128GB Gray",
		rating: 4.7,
		reviews: "2 ta sharh",
		monthlyPrice: "391 584 so'mdan / 18 oy",
		price: "4 699 000 so'm",
		badge: "Xit savdo",
		timer: "50:0:2",
		bgClass: "from-slate-100 via-zinc-50 to-emerald-50",
		accentClass: "bg-emerald-500/12 text-emerald-600",
	},
	{
		id: 2,
		name: "AirPods Pro 2 USB-C simsiz quloqchin",
		rating: 4.9,
		reviews: "14 ta sharh",
		monthlyPrice: "215 417 so'mdan / 12 oy",
		price: "2 585 000 so'm",
		badge: "Aksessuar",
		timer: "00:12",
		bgClass: "from-zinc-100 via-white to-sky-50",
		accentClass: "bg-sky-500/12 text-sky-600",
	},
	{
		id: 3,
		name: "Power bank 20 000mAh tez quvvatlash",
		rating: 4.5,
		reviews: "Sharh yo'q",
		monthlyPrice: "65 417 so'mdan / 18 oy",
		price: "785 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-orange-50 via-white to-zinc-100",
		accentClass: "bg-orange-500/12 text-orange-600",
	},
	{
		id: 4,
		name: 'LG 75" UHD Smart TV premium model',
		rating: 4.8,
		reviews: "6 ta sharh",
		monthlyPrice: "1 499 167 so'mdan / 18 oy",
		price: "17 990 000 so'm",
		badge: "Chegirma",
		timer: "50:0:2",
		bgClass: "from-fuchsia-50 via-white to-cyan-50",
		accentClass: "bg-fuchsia-500/12 text-fuchsia-600",
	},
	{
		id: 5,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 6,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 7,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 8,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 9,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 22,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
	{
		id: 23,
		name: "VITEK VT2340 havo namlagichi",
		rating: 4.4,
		reviews: "Sharh yo'q",
		monthlyPrice: "91 584 so'mdan / 18 oy",
		price: "1 099 000 so'm",
		badge: "Xit savdo",
		bgClass: "from-slate-100 via-zinc-50 to-violet-50",
		accentClass: "bg-violet-500/12 text-violet-600",
	},
];

function ProductArt({
	product,
}: {
	product: Pick<Product, "name" | "bgClass" | "accentClass">;
}) {
	return (
		<div
			className={`relative flex h-72 items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-b ${product.bgClass}`}
		>
			<div className='absolute left-4 top-4 flex gap-2'>
				<span className='rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-semibold text-white'>
					50:0:2
				</span>
				<span className='rounded-full bg-sky-500 px-2.5 py-1 text-[11px] font-semibold text-white'>
					0:0:12
				</span>
			</div>
			<div className='absolute inset-x-10 bottom-6 h-10 rounded-full bg-black/10 blur-2xl' />
			<div className='relative flex h-52 w-36 items-center justify-center rounded-[2.25rem] border border-white/70 bg-white shadow-xl'>
				<div className={`rounded-3xl p-6 ${product.accentClass}`}>
					<FaMobileScreenButton className='size-16' />
				</div>
			</div>
		</div>
	);
}

export default function Products() {
	return (
		<section className='pb-16 pt-6'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mb-6 flex items-center justify-between gap-4'>
					<div>
						<h2 className='text-3xl font-semibold tracking-tight'>Xit savdo</h2>
						<p className='mt-1 text-sm text-muted-foreground'>
							Eng ko&apos;p sotilayotgan telefon va aksessuarlar
						</p>
					</div>
					<Button asChild variant='ghost' className='gap-2 text-primary'>
						<Link href='/products'>
							Barchasini ko&apos;rish
							<FaArrowRight className='size-4' />
						</Link>
					</Button>
				</div>

				<Swiper
					loop
					spaceBetween={20}
					slidesPerView={1.05}
					modules={[Autoplay]}
					autoplay={{
						delay: 2600,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: { slidesPerView: 1.6 },
						768: { slidesPerView: 2.2 },
						1024: { slidesPerView: 3.2 },
						1280: { slidesPerView: 4.2 },
					}}
					className='!overflow-visible'
				>
					{products.map(product => (
						<SwiperSlide key={product.id} className='h-auto'>
							<Card className='flex h-full flex-col border-none bg-transparent shadow-none'>
								<CardHeader className='p-0'>
									<ProductArt product={product} />
								</CardHeader>
								<CardContent className='flex flex-1 flex-col px-2 pb-0 pt-4'>
									<div className='mb-3 flex items-center gap-2'>
										<span className='rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white'>
											{product.badge}
										</span>
									</div>
									<CardTitle className='line-clamp-2 text-[1.05rem] leading-7 text-foreground'>
										{product.name}
									</CardTitle>
									<CardDescription className='mt-3 flex items-center gap-2 text-base'>
										<FaStar className='size-4 text-amber-400' />
										<span className='font-semibold text-foreground'>
											{product.rating}
										</span>
										<span className='flex items-center gap-1'>
											<FaRegMessage className='size-3.5' />
											{product.reviews}
										</span>
									</CardDescription>
									<div className='mt-4'>
										<span className='rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground'>
											{product.monthlyPrice}
										</span>
									</div>
								</CardContent>
								<CardFooter className='items-end justify-between gap-4 px-2 pt-5'>
									<div>
										<p className='text-3xl font-semibold tracking-tight text-foreground'>
											{product.price}
										</p>
									</div>
									<Button
										size='icon'
										variant='outline'
										className='rounded-2xl border-2 border-amber-400 bg-background hover:bg-amber-50'
									>
										<FaCartShopping className='size-5' />
									</Button>
								</CardFooter>
							</Card>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
