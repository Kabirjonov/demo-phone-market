"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { slugifyProduct } from "@/mockInfo/data";

import "swiper/css";

type ProductCardProps = {
	product: IProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
	const router = useRouter();
	const productHref = `/product/detail/${slugifyProduct(product.title)}`;

	return (
		<div className='group'>
			<div
				className=' cursor-pointer p-2 group-hover:shadow rounded-2xl'
				role='link'
				tabIndex={0}
				onClick={() => router.push(productHref)}
				onKeyDown={event => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						router.push(productHref);
					}
				}}
			>
				<div className='rounded-3xl bg-muted/40 p-3 '>
					<div className='mb-3 flex gap-2'>
						{product.discount && (
							<span className='rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white'>
								{product.discount}
							</span>
						)}
						{product.discountSecondary && (
							<span className='rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white'>
								{product.discountSecondary}
							</span>
						)}
					</div>

					<div className='relative h-[220px] overflow-hidden'>
						{product.image.length > 1 ? (
							<Swiper
								modules={[Autoplay]}
								slidesPerView={1}
								loop={true}
								speed={700}
								allowTouchMove={true}
								autoplay={{
									delay: 1800,
									disableOnInteraction: false,
									pauseOnMouseEnter: false,
								}}
								className='h-full'
							>
								{product.image.map((imageSrc, index) => (
									<SwiperSlide key={`${product.id}-${index}`}>
										<div className='flex h-[220px] items-center justify-center'>
											<Image
												src={imageSrc}
												alt={`${product.title} ${index + 1}`}
												width={220}
												height={220}
												className='h-auto max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
											/>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<div className='flex h-[220px] items-center justify-center'>
								<Image
									src={product.image[0]}
									alt={product.title}
									width={220}
									height={220}
									className='h-auto max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
								/>
							</div>
						)}
					</div>

					{product.badge && (
						<div className='mt-2'>
							<span className='rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
								{product.badge}
							</span>
						</div>
					)}
				</div>

				<div className='mt-4 space-y-3'>
					<h3 className='line-clamp-2 min-h-[56px] text-lg font-medium leading-7 text-foreground'>
						{product.title}
					</h3>

					<div className='flex items-center gap-1 text-muted-foreground'>
						{product.rating ? (
							<>
								<Star size={16} className='fill-yellow-400 text-yellow-400' />
								<span className='font-medium text-foreground'>
									{product.rating}
								</span>
							</>
						) : (
							<Star size={16} className='fill-muted text-muted' />
						)}
						<span>• {product.reviewsText || "Sharh yo‘q"}</span>
					</div>

					<div>
						<span className='rounded-full bg-muted px-3 py-1 text-sm font-semibold'>
							{/* {formatPrice(product.monthlyPrice)} so‘mdan /{" "} */}
							{product.monthlyPrice}
							{product.monthlyDuration} oy
						</span>
					</div>

					<div className='flex items-end justify-between gap-3'>
						<p className='text-2xl font-bold text-foreground'>
							{/* {formatPrice(product.price)} so‘m */}
							{product.price}
						</p>

						<Button
							size='icon'
							variant='outline'
							className='h-11 w-11 rounded-2xl border-2 border-primary'
							onClick={event => event.stopPropagation()}
						>
							<ShoppingCart className='text-primary' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
