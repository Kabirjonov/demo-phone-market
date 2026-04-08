"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

import { promotions } from "@/mockInfo/data";

export default function Hero() {
	const { t } = useTranslation();

	return (
		<div className='h-[500px] pt-24'>
			<div className='relative h-full'>
				<Swiper
					slidesPerView={1.2}
					centeredSlides={true}
					spaceBetween={20}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
						pauseOnMouseEnter: false,
					}}
					loop
					loopAdditionalSlides={promotions.length}
					speed={900}
					navigation={{
						prevEl: ".prev",
						nextEl: ".next",
					}}
					// pagination={{ clickable: true }}
					modules={[Autoplay, Navigation]}
					className='h-full w-full'
				>
					{promotions.map(slide => (
						<SwiperSlide key={slide.slug}>
							<div className='relative h-full w-full overflow-hidden rounded-3xl'>
								<Link
									// href={`/promotions/${slide.slug}`}
									href={"/"}
									className='block h-full cursor-pointer'
								>
									<Image
										src={slide.image}
										alt={t(`hero.promotions.${slide.slug}.title`, slide.title)}
										fill
										className='object-cover'
										unoptimized
									/>
									<div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(8,15,28,0.9)_0%,rgba(8,15,28,0.56)_45%,rgba(8,15,28,0.18)_100%)]' />

									<div className='absolute inset-0 flex flex-col justify-center px-6 text-white md:px-8'>
										<span className='mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-sm font-medium backdrop-blur'>
											{t(`hero.promotions.${slide.slug}.label`, slide.label)}
										</span>
										<h2 className='max-w-2xl text-2xl font-bold md:text-4xl'>
											{t(`hero.promotions.${slide.slug}.title`, slide.title)}
										</h2>
										<p className='mt-3 max-w-2xl text-sm opacity-90 md:text-lg truncate'>
											{t(
												`hero.promotions.${slide.slug}.summary`,
												slide.summary,
											)}
										</p>
										<div className='mt-5 flex flex-wrap items-center gap-3 text-sm text-white/85'>
											<span>
												{t(
													`hero.promotions.${slide.slug}.period`,
													slide.period,
												)}
											</span>
											<span className='h-1.5 w-1.5 rounded-full bg-white/70' />
											<span>
												{t(
													`hero.promotions.${slide.slug}.publishedAt`,
													slide.publishedAt,
												)}
											</span>
										</div>
									</div>
								</Link>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<button className='prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur'>
					<ChevronLeft />
				</button>

				<button className='next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur'>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
