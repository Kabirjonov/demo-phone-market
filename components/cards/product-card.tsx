"use client";

import { IProduct } from "@/type";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import LikedProductButton from "@/components/shared/Liked-product-button";

import "swiper/css";
import { resolveProductImage } from "@/lib/resolveProductImage";

type ProductCardProps = {
	product: IProduct;
};

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

export default function ProductCard({ product }: ProductCardProps) {
	const router = useRouter();
	const productHref = `/product/${product.slug ?? product.id}`;
	const productImages =
		product.images?.length > 0
			? product.images.map(image => resolveProductImage(image))
			: ["/logo.png"];

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
						{productImages.length > 1 ? (
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
								{productImages.map((imageSrc, index) => (
									<SwiperSlide key={`${product.id}-${index}`}>
										<div className='relative flex h-[220px] items-center justify-center'>
											<img
												src={imageSrc}
												alt={`${product.title} ${index + 1}`}
												className='h-auto rounded-xl max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
											/>
											{/* 
											{product.badge && (
												<div className='absolute left-2 bottom-2'>
													<span className='rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
														{product.badge}
													</span>
												</div>
											)} */}
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<div className='flex h-[220px]  items-center justify-center'>
								<img
									src={productImages[0]}
									alt={product.title}
									className='h-auto rounded-xl max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105'
								/>

								{product.brand && (
									<div className='mt-2'>
										<span className='rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white'>
											{product.brand}
										</span>
									</div>
								)}
							</div>
						)}
					</div>
					{/*  */}
				</div>

				<div className='mt-4 space-y-3'>
					<div className='flex justify-between items-start gap-2'>
						<h3 className='min-w-0 flex-1 line-clamp-2 min-h-[56px] text-lg font-medium leading-7 text-foreground'>
							{product.title}
						</h3>
						<span className='rounded-lg shrink-0  bg-orange-500 px-3 py-1 text-sm font-medium text-white flex items-center'>
							{product.brand}
						</span>
					</div>

					<p className='line-clamp-2 min-h-[48px] text-sm leading-6 text-muted-foreground'>
						{product.shortDescription || product.description}
					</p>

					{/* <div>
						<span className='rounded-full bg-muted px-3 py-1 text-sm font-semibold'>
							Naqd yoki karta orqali to&apos;lov
						</span>
					</div> */}
					{product.specifications?.map(item => (
						<p
							key={`${product.id}-${item.group ?? "general"}-${item.label}`}
							className=' text-sm  text-muted-foreground'
						>
							{item.label}:{item.value}
						</p>
					))}
					<div className='flex items-center justify-between gap-2'>
						<p className='min-w-0 flex-1 text-xl font-bold text-foreground md:text-2xl'>
							{formatPrice(product.price)} so&apos;m
						</p>

						<div className='shrink-0'>
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
		</div>
	);
}
