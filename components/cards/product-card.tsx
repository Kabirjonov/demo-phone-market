"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { IProduct } from "@/type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import { slugifyProduct } from "@/mockInfo/data";
import LikedProductButton from "@/components/shared/Liked-product-button";

import "swiper/css";

type ProductCardProps = {
	product: IProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
	const router = useRouter();
	const productHref = `/product/detail/${slugifyProduct(product.title)}`;

	return (
		<div className=''>
			<div
				// className=' shadow-[0_16px_42px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(15,23,42,0.09)]'
				className='group cursor-pointer  p-4 group-hover:shadow rounded-2xl border border-border/70 dark:bg-secondary/30'
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
					<div className='relative h-[220px] overflow-hidden'>
						{product.images.length > 1 ? (
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
								{product.images.map((imageSrc, index) => (
									<SwiperSlide key={`${product.id}-${index}`}>
										<div className='relative flex h-[220px] items-center justify-center'>
											<Image
												src={imageSrc}
												alt={`${product.title} ${index + 1}`}
												width={220}
												height={220}
												className='h-auto rounded-xl max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
											/>

											{product.badge && (
												<div className='absolute left-2 bottom-2'>
													<span className='rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
														{product.badge}
													</span>
												</div>
											)}
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<div className='flex h-[220px]  items-center justify-center'>
								<Image
									src={product.images[0]}
									alt={product.title}
									width={220}
									height={220}
									className='h-auto rounded-xl max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
								/>

								{product.badge && (
									<div className='mt-2'>
										<span className='rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
											{product.badge}
										</span>
									</div>
								)}
							</div>
						)}
					</div>
					{/*  */}
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
							Naqd yoki karta orqali to&apos;lov
						</span>
					</div>

					<div className='flex items-end justify-between gap-3'>
						<p className='text-2xl font-bold text-foreground'>
							{/* {formatPrice(product.price)} so‘m */}
							{product.price}
						</p>

						<LikedProductButton
							productId={product.id}
							onClick={event => {
								event.stopPropagation();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
