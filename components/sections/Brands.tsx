// "use client";

// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Autoplay, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

// const brands = [
// 	{ id: "lg", logo: "/brands/lg.svg", alt: "LG" },
// 	{ id: "samsung", logo: "/brands/samsung.svg", alt: "Samsung" },
// 	{ id: "xiaomi", logo: "/brands/xiaomi.svg", alt: "Xiaomi" },
// 	{ id: "huawei", logo: "/brands/huawei.svg", alt: "Huawei" },
// 	{ id: "honor", logo: "/brands/honor.svg", alt: "Honor" },
// 	{ id: "vivo2", logo: "/brands/vivo.svg", alt: "Vivo" },
// 	{ id: "vivo3", logo: "/brands/apple-black.svg", alt: "Apple" },
// 	{ id: "vivo4", logo: "/brands/asus.svg", alt: "Asus" },
// 	{ id: "vivo5", logo: "/brands/hp.svg", alt: "Hp" },
// 	{ id: "vivo6", logo: "/brands/honor.svg", alt: "Honor" },
// 	{
// 		id: "apple",
// 		logo: "/brands/apple-authorized-reseller.svg",
// 		alt: "Apple Authorized Reseller",
// 	},
// ];

// export default function BrandsSection() {
// 	return (
// 		<section className='py-8'>
// 			<div className='rounded-3xl bg-muted/45 px-4 py-6 md:px-8 lg:px-10'>
// 				<h2 className='text-2xl font-semibold text-foreground md:text-4xl'>
// 					Ommabop brendlar
// 				</h2>

// 				<div className='mt-7 flex items-center gap-2 md:gap-4'>
// 					<button
// 						type='button'
// 						className='brands-prev grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground'
// 						aria-label='Oldingi brendlar'
// 					>
// 						<ChevronLeft size={20} />
// 					</button>

// 					<div className='flex-1'>
// 						<Swiper
// 							modules={[Autoplay, Navigation]}
// 							loop
// 							speed={700}
// 							spaceBetween={20}
// 							autoplay={{
// 								delay: 1800,
// 								disableOnInteraction: false,
// 								pauseOnMouseEnter: true,
// 							}}
// 							navigation={{
// 								prevEl: ".brands-prev",
// 								nextEl: ".brands-next",
// 							}}
// 							breakpoints={{
// 								320: { slidesPerView: 2.1 },
// 								640: { slidesPerView: 3.2 },
// 								1024: { slidesPerView: 5.2 },
// 								1280: { slidesPerView: 6.2 },
// 							}}
// 							className='w-full'
// 						>
// 							{brands.map(brand => (
// 								<SwiperSlide key={brand.id}>
// 									<div className='flex h-[88px] items-center justify-center rounded-2xl bg-white px-4'>
// 										<Image
// 											src={brand.logo}
// 											alt={brand.alt}
// 											width={160}
// 											height={60}
// 											className='h-auto max-h-[42px] w-auto max-w-full object-contain'
// 										/>
// 									</div>
// 								</SwiperSlide>
// 							))}
// 						</Swiper>
// 					</div>

// 					<button
// 						type='button'
// 						className='brands-next grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground'
// 						aria-label='Keyingi brendlar'
// 					>
// 						<ChevronRight size={20} />
// 					</button>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const brands = [
	{ id: "honor", logo: "/brands/honor.svg", alt: "HONOR" },
	{ id: "asus", logo: "/brands/asus.svg", alt: "asus" },
	{ id: "vivo", logo: "/brands/vivo.svg", alt: "VIVO" },
	{
		id: "apple",
		logo: "/brands/apple-black.svg",
		alt: "Apple",
	},
	{ id: "hp", logo: "/brands/hp.svg", alt: "hp" },
	{ id: "samsung", logo: "/brands/samsung.svg", alt: "Samsung" },
	{ id: "xiaomi", logo: "/brands/xiaomi.svg", alt: "xiaomi" },
	{ id: "hisense", logo: "/brands/hisense.svg", alt: "Hisense" },
];

export default function BrandsSection() {
	return (
		<section className='py-8'>
			<div className='rounded-[28px] bg-[#f5f5f5] px-4 py-6 md:px-8 lg:px-10'>
				<h2 className='text-xl font-semibold text-black md:text-3xl'>
					Top brendlar
				</h2>

				<div className='mt-6 flex items-center gap-3'>
					<button
						type='button'
						aria-label='Oldingi brendlar'
						className='brands-prev grid h-10 w-10 shrink-0 place-items-center rounded-full text-black transition hover:bg-white'
					>
						<ChevronLeft size={24} />
					</button>

					<div className='min-w-0 flex-1'>
						<Swiper
							modules={[Autoplay, Navigation]}
							navigation={{
								prevEl: ".brands-prev",
								nextEl: ".brands-next",
							}}
							loop={true}
							speed={700}
							autoplay={{
								delay: 2200,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							spaceBetween={16}
							slidesPerView='auto'
							className='w-full'
						>
							{brands.map(brand => (
								<SwiperSlide
									key={brand.id}
									className='!w-[140px] sm:!w-[170px] lg:!w-[190px]'
								>
									<Link
										href={`/catalog/${brand.alt.toLowerCase()}`}
										className='flex h-[88px] items-center justify-center px-3'
									>
										<Image
											src={brand.logo}
											alt={brand.alt}
											width={160}
											height={60}
											className='h-auto cursor-pointer max-h-[42px] w-auto max-w-full object-contain'
										/>
									</Link>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<button
						type='button'
						aria-label='Keyingi brendlar'
						className='brands-next grid h-10 w-10 shrink-0 place-items-center rounded-full text-black transition hover:bg-white'
					>
						<ChevronRight size={24} />
					</button>
				</div>
			</div>
		</section>
	);
}
