"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const brands = [
	{ id: "lg", logo: "/brands/lg.svg", alt: "LG" },
	{ id: "samsung", logo: "/brands/samsung.svg", alt: "Samsung" },
	{ id: "xiaomi", logo: "/brands/xiaomi.svg", alt: "Xiaomi" },
	{ id: "huawei", logo: "/brands/huawei.svg", alt: "Huawei" },
	{ id: "honor", logo: "/brands/honor.svg", alt: "Honor" },
	{ id: "vivo2", logo: "/brands/vivo.svg", alt: "Vivo" },
	{ id: "vivo3", logo: "/brands/apple-black.svg", alt: "Apple" },
	{ id: "vivo4", logo: "/brands/asus.svg", alt: "Asus" },
	{ id: "vivo5", logo: "/brands/hp.svg", alt: "Hp" },
	{ id: "vivo6", logo: "/brands/honor.svg", alt: "Honor" },
	{
		id: "apple",
		logo: "/brands/apple-authorized-reseller.svg",
		alt: "Apple Authorized Reseller",
	},
];

export default function BrandsSection() {
	return (
		<section className='py-8'>
			<div className='rounded-3xl bg-muted/45 px-4 py-6 md:px-8 lg:px-10'>
				<h2 className='text-2xl font-semibold text-foreground md:text-4xl'>
					Ommabop brendlar
				</h2>

				<div className='mt-7 flex items-center gap-2 md:gap-4'>
					<button
						type='button'
						className='brands-prev grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground'
						aria-label='Oldingi brendlar'
					>
						<ChevronLeft size={20} />
					</button>

					<div className='flex-1'>
						<Swiper
							modules={[Autoplay, Navigation]}
							loop
							speed={700}
							spaceBetween={20}
							autoplay={{
								delay: 1800,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							navigation={{
								prevEl: ".brands-prev",
								nextEl: ".brands-next",
							}}
							breakpoints={{
								320: { slidesPerView: 2.1 },
								640: { slidesPerView: 3.2 },
								1024: { slidesPerView: 5.2 },
								1280: { slidesPerView: 6.2 },
							}}
							className='w-full'
						>
							{brands.map(brand => (
								<SwiperSlide key={brand.id}>
									<div className='flex h-20 items-center justify-center rounded-2xl bg-background/80 px-4'>
										<Image
											src={brand.logo}
											alt={brand.alt}
											width={170}
											height={60}
											className='h-11 w-20 object-contain'
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<button
						type='button'
						className='brands-next grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground'
						aria-label='Keyingi brendlar'
					>
						<ChevronRight size={20} />
					</button>
				</div>
			</div>
		</section>
	);
}
