"use client";

import { useState } from "react";
import Image from "next/image";
import {
	ArrowRight,
	ChevronRight,
	Copy,
	Heart,
	Scale,
	ShieldCheck,
	ShoppingCart,
	Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/type";
import { hitProducts } from "@/mockInfo/data";
import ProductSection from "./Products";

type ProductDetailViewProps = {
	product: IProduct;
};

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
	const [selectedImage, setSelectedImage] = useState(product.image[0]);
	const relatedProducts = hitProducts
		.filter(item => item.id !== product.id)
		.slice(0, 5);

	return (
		<div className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='mb-8 flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-center lg:justify-between'>
				<h1 className='max-w-4xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl'>
					{product.title}
				</h1>

				<div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
					<span>
						Kod:{" "}
						<span className='font-medium text-foreground'>{product.code}</span>
					</span>
					<Copy size={16} />
					<span className='rounded-full bg-emerald-100 px-3 py-1 text-emerald-600'>
						{product.availability}
					</span>
				</div>
			</div>

			<div className='mb-8 flex flex-wrap gap-6 text-muted-foreground'>
				<div className='flex items-center gap-2'>
					<Heart size={20} />
					<span>Sevimlilarga</span>
				</div>
				<div className='flex items-center gap-2'>
					<Scale size={20} />
					<span>Taqqoslashga</span>
				</div>
				<div className='flex items-center gap-2'>
					<Star size={18} className='fill-muted text-muted' />
					<span>{product.reviewsText || "Sharh yo'q"}</span>
				</div>
			</div>

			<div className='grid gap-8 xl:grid-cols-[1.15fr_0.95fr_380px]'>
				<div className='grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]'>
					<div className='order-2 flex gap-3 md:order-1 md:flex-col'>
						{product.image.map(image => {
							const isActive = selectedImage === image;

							return (
								<button
									key={image}
									type='button'
									onClick={() => setSelectedImage(image)}
									className={`flex h-20 w-20 items-center justify-center rounded-2xl border bg-white p-2 transition ${
										isActive
											? "border-yellow-400 shadow-sm"
											: "border-border hover:border-yellow-300"
									}`}
								>
									<Image
										src={image}
										alt={product.title}
										width={64}
										height={64}
										className='h-16 w-16 object-contain'
									/>
								</button>
							);
						})}
					</div>

					<div className='order-1 flex min-h-[420px] items-center justify-center rounded-[32px] bg-white p-6 md:order-2'>
						<Image
							src={selectedImage}
							alt={product.title}
							width={520}
							height={520}
							className='h-auto max-h-[520px] w-auto object-contain'
							priority
						/>
					</div>
				</div>

				<div className='space-y-6 pt-2'>
					<div className='flex flex-wrap gap-2'>
						{product.badge && (
							<span className='rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white'>
								{product.badge}
							</span>
						)}
						{product.discount && (
							<span className='rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white'>
								{product.discount}
							</span>
						)}
						{product.discountSecondary && (
							<span className='rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white'>
								{product.discountSecondary}
							</span>
						)}
					</div>

					<h2 className='text-2xl font-semibold text-foreground'>
						{product.shortDescription}
					</h2>

					<div className='space-y-4 text-lg'>
						<div className='grid grid-cols-[130px_1fr_120px] items-center gap-4 text-muted-foreground'>
							<span>Brend</span>
							<span className='h-px bg-border' />
							<span className='text-foreground'>{product.brand}</span>
						</div>
						<div className='grid grid-cols-[130px_1fr_120px] items-center gap-4 text-muted-foreground'>
							<span>Hajmi</span>
							<span className='h-px bg-border' />
							<span className='text-foreground'>{product.capacity}</span>
						</div>
					</div>

					<button
						type='button'
						className='font-medium text-blue-600 transition hover:text-blue-700'
					>
						Barcha xususiyatlar
					</button>
				</div>

				<div className='space-y-4'>
					<div className='rounded-[30px] border border-border bg-white p-5 shadow-sm'>
						<p className='text-[20px] font-semibold text-foreground md:text-[24px]'>
							{formatPrice(product.price)} so&apos;m
						</p>

						<div className='mt-5 rounded-2xl bg-slate-100 p-3'>
							<div className='flex items-center justify-between gap-3'>
								<span className='text-sm text-slate-700'>
									Muddatli to&apos;lov
								</span>
								<div className='flex items-center gap-2'>
									<span className='rounded-xl bg-blue-500 px-3 py-2 text-sm font-semibold text-white'>
										{formatPrice(product.monthlyPrice)} so&apos;m
									</span>
									<span className='text-sm text-slate-700'>
										{product.monthlyDuration} / oy
									</span>
								</div>
							</div>
						</div>

						<p className='mt-4 text-sm leading-6 text-muted-foreground'>
							{product.installmentNote}
						</p>

						<div className='mt-5 grid grid-cols-2 gap-3'>
							<Button className='h-14 rounded-2xl bg-yellow-400 text-base font-semibold text-black hover:bg-yellow-300'>
								<ShoppingCart />
								Savatga
							</Button>
							<Button
								variant='outline'
								className='h-14 rounded-2xl border-0 bg-slate-200 text-base font-semibold text-slate-700 hover:bg-slate-300'
							>
								Birgina klik orqali xarid
							</Button>
						</div>

						<div className='mt-6 border-t border-border pt-5'>
							<p className='mb-4 text-sm leading-6 text-muted-foreground'>
								Muddatli to&apos;lov rasmiylashtirayotganingizda bizdan va
								hamkorlardan eng ma&apos;qul takliflarga ega bo&apos;ling.
							</p>
							<div className='flex flex-wrap gap-3'>
								{(product.providers || []).map(provider => (
									<div
										key={provider}
										className='rounded-2xl border border-border bg-white px-3 py-3 text-sm font-medium text-foreground shadow-sm'
									>
										{provider}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='flex items-center justify-between rounded-[26px] border border-border bg-white px-5 py-4 shadow-sm'>
						<div>
							<p className='text-lg font-semibold text-foreground'>
								Do&apos;kondan olib ketish bepul
							</p>
							<p className='text-sm text-blue-600'>
								{product.storeCount} ta do&apos;konda mavjud
							</p>
						</div>
						<ChevronRight className='text-muted-foreground' />
					</div>

					<div className='flex items-center justify-center gap-3 rounded-[26px] bg-slate-100 px-5 py-4 text-foreground'>
						<ShieldCheck className='text-slate-500' />
						<span className='font-medium'>Kafolat {product.warranty}</span>
					</div>
				</div>
			</div>

			<section className='mt-10 overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(135deg,#0f172a_0%,#13213d_45%,#1d4ed8_100%)] text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]'>
				<div className='grid gap-8 px-6 py-8 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10'>
					<div className='max-w-2xl space-y-5'>
						<span className='inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90 backdrop-blur'>
							Maxsus taklif
						</span>
						<h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>
							0% ustama bilan muddatli to&apos;lovni hoziroq faollashtiring
						</h2>
						<p className='max-w-xl text-base leading-7 text-white/75 md:text-lg'>
							Tanlangan texnikalarda qulay bo&apos;lib to&apos;lash, tezkor
							rasmiylashtirish va hamkor banklardan eng foydali takliflar sizni
							kutmoqda.
						</p>
						<div className='flex flex-wrap gap-3'>
							<Button className='h-12 rounded-2xl bg-white px-5 text-base font-semibold text-slate-950 hover:bg-white/90'>
								Aksiyani ko&apos;rish
								<ArrowRight />
							</Button>
							<Button
								variant='outline'
								className='h-12 rounded-2xl border-white/20 bg-white/10 px-5 text-base font-semibold text-white hover:bg-white/15'
							>
								Maslahat olish
							</Button>
						</div>
					</div>

					<div className='grid gap-4 sm:grid-cols-3'>
						<div className='rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur'>
							<p className='text-3xl font-bold'>0%</p>
							<p className='mt-2 text-sm leading-6 text-white/75'>
								Boshlang&apos;ich to&apos;lovsiz xarid
							</p>
						</div>
						<div className='rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur'>
							<p className='text-3xl font-bold'>12 oy</p>
							<p className='mt-2 text-sm leading-6 text-white/75'>
								Qulay muddatli to&apos;lov
							</p>
						</div>
						<div className='rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur'>
							<p className='text-3xl font-bold'>24/7</p>
							<p className='mt-2 text-sm leading-6 text-white/75'>
								Onlayn ariza va tezkor javob
							</p>
						</div>
					</div>
				</div>
			</section>

			<ProductSection
				title='O‘xshash mahsulotlar'
				products={relatedProducts}
				viewAllHref='/product'
			/>
		</div>
	);
}
