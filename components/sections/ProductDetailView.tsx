"use client";

import { useState } from "react";
import Image from "next/image";
import {
	ArrowRight,
	ChevronRight,
	Copy,
	Heart,
	Phone,
	ShieldCheck,
	ShoppingCart,
	Star,
} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IProduct } from "@/type";
import { hitProducts } from "@/mockInfo/data";
import ProductSection from "./Products";
import { useLikedProduct } from "@/hooks/useLikedProduct";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { CALL_CENTER_PHONE_NUMBER } from "@/const/data";

type ProductDetailViewProps = {
	product: IProduct;
};

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
	// @ts-ignore
	const [selectedImage, setSelectedImage] = useState(product.images[0]);
	const { liked } = useLikedProduct(product.id);
	const relatedProducts = hitProducts
		.filter(item => item.id !== product.id)
		.slice(0, 5);
	const yandexMapUrl =
		"https://yandex.uz/maps/org/texnool/175427033560/?ll=69.203205%2C41.284762&z=16";
	const groupedSpecifications = (product.specifications || []).reduce<
		Record<string, { label: string; value: string }[]>
	>((acc, item) => {
		const group = item.group || "Asosiy xususiyatlar";
		if (!acc[group]) acc[group] = [];
		acc[group].push({ label: item.label, value: item.value });
		return acc;
	}, {});

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
				</div>
			</div>

			<div className='mb-8 flex flex-wrap gap-6 text-muted-foreground'>
				<div
					className={cn(
						"flex items-center gap-2 transition-colors",
						liked && "text-primary",
					)}
				>
					<Heart size={20} className={cn(liked && "fill-current")} />
					<span>Sevimlilarga</span>
				</div>
				{/* <div className='flex items-center gap-2'>
					<Scale size={20} />
					<span>Taqqoslashga</span>
				</div> */}
				<div className='flex items-center gap-2'>
					<Star size={18} className='fill-muted text-muted' />
					<span>{product.reviewsText || "Sharh yo'q"}</span>
				</div>
			</div>

			<div className='grid gap-8 xl:grid-cols-[1.15fr_0.95fr_380px]'>
				<div className='grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]'>
					<div className='order-2 flex gap-3 md:order-1 md:flex-col'>
						{/* @ts-ignore */}
						{product.images.map(image => {
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
						<span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700'>
							Naqd yoki karta
						</span>
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

					<Link
						href={"#moreInfo"}
						className='font-medium text-blue-600 transition hover:text-blue-700'
					>
						Barcha xususiyatlar
					</Link>
				</div>

				<div className='space-y-4'>
					<div className='rounded-[30px] border border-border bg-white p-5 shadow-sm'>
						<p className='text-[20px] font-semibold text-foreground md:text-[24px]'>
							{formatPrice(product.price)} so&apos;m
						</p>

						<div className='mt-5 rounded-2xl bg-slate-100 p-3'>
							<div className='flex items-center justify-between gap-3'>
								<span className='text-sm font-medium text-slate-700'>
									To&apos;lov turi
								</span>
								<span className='rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white'>
									Naqd yoki karta
								</span>
							</div>
						</div>

						<p className='mt-4 text-sm leading-6 text-muted-foreground'>
							Mahsulotni do&apos;konda yoki yetkazib berishda naqd pul va bank
							kartasi orqali to&apos;lashingiz mumkin.
						</p>

						<div className='mt-5 grid grid-cols-2 gap-3'>
							<Button className='h-14 rounded-2xl bg-yellow-400 text-base font-semibold text-black hover:bg-yellow-300'>
								<ShoppingCart className='mr-2 h-5 w-5' />
								Rasmilashtirish
							</Button>

							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant='outline'
										className='h-14 rounded-2xl border-0 bg-slate-200 text-base font-semibold text-slate-700 hover:bg-slate-300'
									>
										Bog&apos;lanish
									</Button>
								</DialogTrigger>

								<DialogContent className='w-[95vw] max-w-[520px] rounded-3xl border-0 p-0'>
									<div className='p-6 sm:p-7'>
										<Tabs
											defaultValue='contact'
											className='flex w-full flex-col'
										>
											<TabsList className='mb-6 grid h-auto w-full grid-cols-2 rounded-2xl bg-slate-100 p-1'>
												<TabsTrigger
													disabled
													value='contact'
													className='h-12 rounded-xl px-3 text-center text-sm font-medium whitespace-normal data-[state=active]:bg-white data-[state=active]:shadow-none'
												>
													Men bilan bog&apos;laning
												</TabsTrigger>

												<TabsTrigger
													value='self'
													className='h-12 rounded-xl px-3 text-center text-sm font-medium whitespace-normal data-[state=active]:bg-white data-[state=active]:shadow-none'
												>
													O&apos;zim bog&apos;lanaman
												</TabsTrigger>
											</TabsList>

											<TabsContent
												value='contact'
												className='mt-0 block w-full space-y-4'
											>
												<div className='space-y-2'>
													<Label
														htmlFor='name'
														className='text-sm text-slate-500'
													>
														Ism <span className='text-yellow-500'>*</span>
													</Label>
													<Input
														id='name'
														className='h-14 w-full rounded-2xl border-slate-200 px-4 text-base shadow-none'
													/>
												</div>

												<div className='space-y-2'>
													<Label
														htmlFor='surname'
														className='text-sm text-slate-500'
													>
														Familiya <span className='text-yellow-500'>*</span>
													</Label>
													<Input
														id='surname'
														placeholder='Familiya'
														className='h-14 w-full rounded-2xl border-slate-200 px-4 text-base shadow-none'
													/>
												</div>

												<div className='space-y-2'>
													<Label
														htmlFor='phone'
														className='text-sm text-slate-500'
													>
														Telefon <span className='text-yellow-500'>*</span>
													</Label>
													<Input
														id='phone'
														className='h-14 w-full rounded-2xl border-slate-200 px-4 text-base font-medium shadow-none'
													/>
												</div>

												<Button className='mt-2 h-14 w-full rounded-2xl bg-yellow-400 text-lg font-semibold text-black hover:bg-yellow-300'>
													Ariza yuborish
												</Button>
											</TabsContent>

											<TabsContent
												value='self'
												className='mt-0 block w-full space-y-5'
											>
												<div className='rounded-2xl border border-slate-200 px-4 py-4 text-lg text-slate-700'>
													Mahsulot kodi{" "}
													<span className='ml-2 font-bold tracking-wide text-slate-900'>
														{product.code}
													</span>
												</div>

												<div className='flex items-center justify-between rounded-2xl bg-slate-100 px-5 py-5'>
													<div>
														<div className='text-2xl font-bold italic text-slate-900'>
															{CALL_CENTER_PHONE_NUMBER}
														</div>
														<p className='mt-1 text-sm italic text-slate-500'>
															Aloqa markazi
														</p>
													</div>

													<Link
														href={`tel:${CALL_CENTER_PHONE_NUMBER}`}
														className='h-14 w-14 flex items-center justify-center rounded-full border-slate-300 bg-white'
													>
														<Phone className='h-6 w-6 text-slate-700' />
													</Link>
												</div>
											</TabsContent>
										</Tabs>
									</div>
								</DialogContent>
							</Dialog>
						</div>

						<div className='mt-6 border-t border-border pt-5'>
							<p className='mb-4 text-sm leading-6 text-muted-foreground'>
								Xaridni o&apos;zingizga qulay usulda yakunlang: naqd pul yoki
								uzum, humo, visa kabi bank kartalari orqali to&apos;lov qiling.
							</p>
							<div className='flex flex-wrap gap-3'>
								{["Naqd to'lov", "Visa", "Mastercard", "Humo", "Uzcard"].map(
									provider => (
										<div
											key={provider}
											className='rounded-2xl border border-border bg-white px-3 py-3 text-sm font-medium text-foreground shadow-sm'
										>
											{provider}
										</div>
									),
								)}
							</div>
						</div>
					</div>

					<a
						href={yandexMapUrl}
						target='_blank'
						rel='noreferrer'
						className='flex items-center justify-between rounded-[26px] border border-border bg-white px-5 py-4 shadow-sm transition hover:border-primary/40 hover:shadow-md'
					>
						<div>
							<p className='text-lg font-semibold text-foreground'>
								Do&apos;kondan olib ketish bepul
							</p>
							<p className='text-sm text-blue-600'>
								{product.storeCount} ta do&apos;konda mavjud
							</p>
						</div>
						<ChevronRight className='text-muted-foreground' />
					</a>

					<div className='flex items-center justify-center gap-3 rounded-[26px] bg-slate-100 px-5 py-4 text-foreground'>
						<ShieldCheck className='text-slate-500' />
						<span className='font-medium'>Kafolat {product.warranty}</span>
					</div>
				</div>
			</div>

			{/* <section className='mt-10 overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(135deg,#0f172a_0%,#13213d_45%,#1d4ed8_100%)] text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]'>
				<div className='grid gap-8 px-6 py-8 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10'>
					<div className='max-w-2xl space-y-5'>
						<span className='inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90 backdrop-blur'>
							Maxsus taklif
						</span>
						<h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>
							Original texnikalarni qulay narxda hoziroq xarid qiling
						</h2>
						<p className='max-w-xl text-base leading-7 text-white/75 md:text-lg'>
							Tanlangan mahsulotlarda tezkor buyurtma, rasmiy kafolat va naqd
							yoki karta orqali qulay to&apos;lov sizni kutmoqda.
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
							<p className='text-3xl font-bold'>100%</p>
							<p className='mt-2 text-sm leading-6 text-white/75'>
								Original va tekshirilgan mahsulotlar
							</p>
						</div>
						<div className='rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur'>
							<p className='text-3xl font-bold'>2 usul</p>
							<p className='mt-2 text-sm leading-6 text-white/75'>
								Naqd yoki karta orqali to&apos;lov
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
			</section> */}

			<div className='space-y-3'>
				<h2 className='text-3xl font-semibold text-foreground my-3'>
					Mahsulot xususiyatlari
				</h2>
				{/* <p className='text-base leading-7 text-muted-foreground'>
					Backenddan keladigan asosiy product fieldlar va texnik parametrlarga
					mos ma&apos;lumotlar.
				</p> */}
			</div>

			<div className='grid gap-10 lg:grid-cols-2'>
				<div className='space-y-4'>
					{/* <h3 className='text-xl font-semibold text-foreground'>
						Asosiy xususiyatlar
					</h3> */}

					<div className='space-y-4'>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>Brend</span>
							<span className='font-medium text-foreground'>
								{product.brand}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>Kategoriya</span>
							<span className='font-medium text-foreground'>
								{product.category?.name || "Ko'rsatilmagan"}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>Kod</span>
							<span className='font-medium text-foreground'>
								{product.code}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>Mavjudligi</span>
						</div>
						{product.user ? (
							<>
								<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
									<span className='text-muted-foreground'>
										Mas&apos;ul sotuvchi
									</span>
									<span className='font-medium text-foreground'>
										{product.user.name}
									</span>
								</div>
								{/* <div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
									<span className='text-muted-foreground'>Telefon</span>
									<span className='font-medium text-foreground'>
										{product.user.phone}
									</span>
								</div> */}
							</>
						) : null}
					</div>
				</div>

				<div className='space-y-6'>
					{Object.entries(groupedSpecifications).map(([group, items]) => (
						<div key={group} className='space-y-4'>
							{/* <h3 className='text-xl font-semibold text-foreground'>{group}</h3> */}
							<div className='space-y-4'>
								{items.map(item => (
									<div
										key={`${group}-${item.label}`}
										className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'
									>
										<span className='text-muted-foreground'>{item.label}</span>
										<span className='font-medium text-foreground'>
											{item.value}
										</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='space-y-2 mt-2'>
				<h3 className='text-2xl font-semibold text-foreground'>Batafsil</h3>
				<div className='space-y-4 text-base leading-8 text-foreground/85'>
					{product.description
						.split("\n")
						.filter(Boolean)
						.map(paragraph => (
							<p key={paragraph}>{paragraph}</p>
						))}
				</div>
			</div>
			<ProductSection
				title='O‘xshash mahsulotlar'
				products={relatedProducts}
				viewAllHref='/product'
			/>
		</div>
	);
}
