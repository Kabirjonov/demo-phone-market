"use client";

import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	FaArrowLeft,
	FaArrowRight,
	FaBolt,
	FaBoxOpen,
	FaCalendarDays,
	FaTruckFast,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type HeroSlide = {
	id: number;
	brand: string;
	title: string;
	description: string;
	image: string;
	accent: string;
	stats: Array<{
		icon: React.ComponentType<{ className?: string }>;
		label: string;
		value: string;
	}>;
};

const heroSlides: HeroSlide[] = [
	{
		id: 1,
		brand: "Samsung Week",
		title: "Galaxy seriyasini qulay to'lov bilan xarid qiling",
		description:
			"Yangi smartfonlar uchun tez yetkazib berish, rasmiy kafolat va boshlang'ich to'lovsiz aksiyalar bir joyda.",
		image: "https://picsum.photos/seed/phone-store-1/1600/900",
		accent: "from-black/70 via-slate-900/40 to-transparent",
		stats: [
			{
				icon: FaTruckFast,
				label: "Tez yetkazib berish",
				value: "24 soat ichida",
			},
			{ icon: FaCalendarDays, label: "Muddatli to'lov", value: "0-0-12" },
			{ icon: FaBoxOpen, label: "Omborda bor", value: "120+ model" },
		],
	},
	{
		id: 2,
		brand: "Hot Sale",
		title: "Yarim narxini to'lang, qolganini oyma-oy",
		description:
			"Flagman telefonlar va premium aksessuarlar uchun 50% boshlang'ich to'lov bilan maxsus taklif.",
		image: "https://picsum.photos/seed/phone-store-2/1600/900",
		accent: "from-amber-500/80 via-yellow-400/45 to-orange-200/10",
		stats: [
			{ icon: FaBolt, label: "Chegirma muddati", value: "Bugun tugaydi" },
			{ icon: FaCalendarDays, label: "Boshlang'ich to'lov", value: "50%" },
			{
				icon: FaTruckFast,
				label: "Yetkazib berish",
				value: "Toshkent bo'ylab",
			},
		],
	},
	{
		id: 3,
		brand: "Accessory Day",
		title: "Telefon bilan birga original aksessuarlarni ham oling",
		description:
			"Quloqchin, power bank va himoya g'iloflari uchun alohida promo paketlar tayyor.",
		image: "https://picsum.photos/seed/phone-store-3/1600/900",
		accent: "from-indigo-900/80 via-violet-800/45 to-transparent",
		stats: [
			{ icon: FaBoxOpen, label: "Top paketlar", value: "15 ta to'plam" },
			{
				icon: FaTruckFast,
				label: "Bepul yetkazish",
				value: "1 mln.dan yuqori",
			},
			{ icon: FaCalendarDays, label: "Muddatli to'lov", value: "18 oy" },
		],
	},
];

export default function Hero() {
	return (
		<section className='pb-8 pt-6'>
			<div className='mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8'>
				<div className='relative'>
					<Swiper
						loop
						speed={900}
						spaceBetween={20}
						slidesPerView={1.08}
						centeredSlides
						modules={[Autoplay, Navigation, Pagination]}
						autoplay={{
							delay: 3200,
							disableOnInteraction: false,
						}}
						navigation={{
							nextEl: ".hero-next",
							prevEl: ".hero-prev",
						}}
						pagination={{
							clickable: true,
						}}
						className='hero-swiper'
					>
						{heroSlides.map(slide => (
							<SwiperSlide key={slide.id}>
								<div
									className='relative min-h-[360px] overflow-hidden rounded-[2rem] bg-cover bg-center shadow-xl sm:min-h-[420px] lg:min-h-[460px]'
									style={{ backgroundImage: `url(${slide.image})` }}
								>
									<div
										className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`}
									/>
									<div className='absolute inset-0 bg-black/20' />

									<div className='relative flex h-full flex-col justify-between p-6 text-white sm:p-8 lg:p-10'>
										<div className='max-w-3xl'>
											<span className='inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur'>
												{slide.brand}
											</span>
											<h1 className='mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
												{slide.title}
											</h1>
											<p className='mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base'>
												{slide.description}
											</p>
											<div className='mt-7 flex flex-wrap gap-3'>
												<Button
													asChild
													size='lg'
													className='gap-2 bg-white text-slate-950 hover:bg-white/90'
												>
													<Link href='/products'>
														Mahsulotlarni ko&apos;rish
														<FaArrowRight className='size-4' />
													</Link>
												</Button>
												<Button
													asChild
													size='lg'
													variant='outline'
													className='border-white/30 bg-white/10 text-white hover:bg-white/15'
												>
													<Link href='/products'>Aksiya tafsilotlari</Link>
												</Button>
											</div>
										</div>

										<div className='grid gap-3 pt-8 sm:grid-cols-2 xl:grid-cols-3'>
											{slide.stats.map(item => {
												const Icon = item.icon;

												return (
													<div
														key={item.label}
														className='rounded-3xl border border-white/20 bg-white/12 p-4 backdrop-blur-md'
													>
														<div className='flex items-center gap-3'>
															<div className='rounded-2xl bg-white/15 p-3'>
																<Icon className='size-5' />
															</div>
															<div>
																<p className='text-sm text-white/75'>
																	{item.label}
																</p>
																<p className='mt-1 text-base font-semibold'>
																	{item.value}
																</p>
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<Button
						size='icon'
						variant='outline'
						className='hero-prev absolute left-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border-white/40 bg-white/85 shadow-lg hover:bg-white sm:left-5'
					>
						<FaArrowLeft className='size-4 text-slate-900' />
					</Button>
					<Button
						size='icon'
						variant='outline'
						className='hero-next absolute right-3 top-1/2 z-10 size-12 -translate-y-1/2 rounded-full border-white/40 bg-white/85 shadow-lg hover:bg-white sm:right-5'
					>
						<FaArrowRight className='size-4 text-slate-900' />
					</Button>
				</div>
			</div>
		</section>
	);
}
