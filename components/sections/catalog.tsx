"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";
import { mockData, slugifyProduct } from "@/mockInfo/data";

export default function CatalogSection() {
	const { t } = useTranslation();

	const promotionCard = {
		id: 1,
		title: t("catalogSection.promotionTitle"),
		href: "/promotions/ustamasiz-muddatli-tolov-0012",
		image: "/products/product-1.webp",
	};

	return (
		<section className='py-8'>
			<div className='relative'>
				<button
					type='button'
					aria-label={t("catalogSection.prevAriaLabel")}
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
					<div className='flex '>
						{/* <Link
							href={promotionCard.href}
							className={`group relative block overflow-hidden rounded-xl p-4 bg-card shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]`}
						>
							<div className='relative z-10 flex h-full min-h-[126px] flex-col justify-between'>
								<h2 className='max-w-[150px] text-xl font-semibold leading-7 text-foreground'>
									{promotionCard.title}
								</h2>

								<div className='ml-auto mt-4 flex w-full justify-end'>
									<Image
										src={promotionCard.image}
										alt={promotionCard.title}
										width={120}
										height={120}
										className='h-[92px] w-auto object-contain transition duration-300 group-hover:scale-105'
									/>
								</div>
							</div>

							<div className='absolute -bottom-8 right-6 h-20 w-20 rounded-full bg-white/35 blur-2xl' />
						</Link> */}
						{mockData.map(item => (
							<SwiperSlide key={item.id}>
								<Link
									href={`/catalog/${item.items[0]}`}
									className={`group relative block overflow-hidden rounded-xl p-4 bg-card shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.10)]`}
								>
									<div className='relative z-10 flex h-full min-h-[126px] flex-col justify-between'>
										<h2 className='max-w-[150px] text-xl font-semibold leading-7 text-foreground'>
											{t(item.titleKey)}
										</h2>

										<div className='ml-auto mt-4 flex w-full justify-end'>
											<Image
												src={item.image}
												alt={t(item.titleKey)}
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
					</div>
				</Swiper>

				<button
					type='button'
					aria-label={t("catalogSection.nextAriaLabel")}
					className='catalog-next absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-lg backdrop-blur transition hover:bg-white lg:flex'
				>
					<ChevronRight size={22} />
				</button>
			</div>
		</section>
	);
}
