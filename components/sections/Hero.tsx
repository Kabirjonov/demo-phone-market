"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const slides = [
	{
		title: "Galaxy S26 Ultra",
		subtitle: "Galaxy AI ✨",

		image:
			"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "iPhone 17 Pro",
		subtitle: "New Era",
		image:
			"https://images.unsplash.com/photo-1510552776732-03e61cf4b144?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Xiaomi 16 Ultra",
		subtitle: "Leica Power",
		image:
			"https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Pixel 11 Pro",
		subtitle: "Smart by Google",
		image:
			"https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Nothing Phone 4",
		subtitle: "Pure Design",
		image:
			"https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "OnePlus 14",
		subtitle: "Fast and Fluid",
		image:
			"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1600&auto=format&fit=crop",
	},
];

export default function Hero() {
	return (
		<div className='pt-24 h-[500px]'>
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
					loop={true}
					loopAdditionalSlides={slides.length}
					speed={900}
					navigation={{
						prevEl: ".prev",
						nextEl: ".next",
					}}
					pagination={{ clickable: true }}
					modules={[Autoplay, Navigation, Pagination]}
					className='h-full w-full'
				>
					{slides.map((slide, i) => (
						<SwiperSlide key={i}>
							<div className='relative h-full w-full rounded-3xl overflow-hidden'>
								<Link
									href={`/promotions/${slide.title}`}
									className='cursor-pointer'
								>
									<Image
										src={slide.image}
										alt={slide.title}
										fill
										className='object-cover'
										unoptimized
									/>
									{/* gradient overlay */}
									<div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />
									<div className='absolute inset-0 flex flex-col justify-center px-8 text-white'>
										<h2 className='text-2xl md:text-4xl font-bold'>
											{slide.title}
											aksdalksd
										</h2>
										<p className='text-lg opacity-90 mt-2'>{slide.subtitle}</p>
									</div>
								</Link>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Arrows */}
				<button className='prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-2'>
					<ChevronLeft />
				</button>

				<button className='next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-2'>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
