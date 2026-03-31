"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
	ChevronRight,
	Copy,
	Heart,
	Phone,
	ShieldCheck,
	ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductSection from "./Products";
import { useLikedProduct } from "@/hooks/useLikedProduct";
import { formatPrice } from "@/lib/formatPrice";
import { resolveProductImage } from "@/lib/resolveProductImage";
import { cn } from "@/lib/utils";
import { CALL_CENTER_PHONE_NUMBER } from "@/const/data";
import type { ICategory, IProduct } from "@/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type ProductDetailViewProps = {
	categories: ICategory[];
	product: IProduct;
	relatedProducts?: IProduct[];
};

export default function ProductDetailView({
	categories,
	product,
	relatedProducts = [],
}: ProductDetailViewProps) {
	const { t } = useTranslation();
	const productCategories = useMemo(() => {
		if (product.category) {
			return [product.category];
		}

		return categories.filter(item => item.id === product.category?.id);
	}, [categories, product.category]);
	const images = useMemo(
		() =>
			product.images?.length > 0
				? product.images.map(image => resolveProductImage(image))
				: ["/logo.png"],
		[product.images],
	);
	const [selectedImage, setSelectedImage] = useState(images[0]);
	const { liked } = useLikedProduct(product.id);

	const groupedSpecifications = useMemo(
		() =>
			(product.specifications ?? []).reduce<
				Record<string, { label: string; value: string }[]>
			>((acc, item) => {
				const group =
					item.group || t("productDetail.specifications.defaultGroup");
				if (!acc[group]) acc[group] = [];
				acc[group].push({ label: item.label, value: item.value });
				return acc;
			}, {}),
		[product.specifications, t],
	);

	return (
		<div className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='mb-8 flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-center lg:justify-between'>
				<div className='space-y-3'>
					{/* <h1 className='max-w-4xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl'>
						{product.title}
					</h1>
					<p className='max-w-3xl text-sm leading-7 text-muted-foreground md:text-base'>
						{product.shortDescription || product.description}
					</p> */}
				</div>
				{productCategories.length > 0 ? (
					<div className='mt-2 flex flex-wrap gap-2'>
						{productCategories.map(item => (
							<Link
								key={item.id}
								href={`/catalog/${item.slug}`}
								className='rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground transition hover:bg-primary/90'
							>
								{item.name}
							</Link>
						))}
					</div>
				) : null}

				<div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
					<span>
						{t("productDetail.labels.code")}:{" "}
						<span className='font-medium text-foreground'>{product.code}</span>
					</span>
					<Copy size={16} />
				</div>
			</div>

			<div className='grid gap-8 xl:grid-cols-[1.1fr_0.9fr_360px]'>
				<div className='grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]'>
					<div className='order-2 flex gap-3 md:order-1 md:flex-col'>
						{images.map(image => {
							const isActive = selectedImage === image;

							return (
								<button
									key={image}
									type='button'
									onClick={() => setSelectedImage(image)}
									className={cn(
										"flex h-20 w-20 items-center justify-center rounded-2xl border bg-white p-2 transition",
										isActive
											? "border-primary shadow-sm"
											: "border-border hover:border-primary/50",
									)}
								>
									<img
										src={image}
										alt={product.title}
										className='h-16 w-16 object-contain'
									/>
								</button>
							);
						})}
					</div>

					<div className='order-1 flex min-h-[420px] items-center justify-center rounded-[32px] border border-border/70 bg-white p-6 md:order-2'>
						<img
							src={selectedImage}
							alt={product.title}
							className='h-auto max-h-[520px] w-auto object-contain'
						/>
					</div>
				</div>

				<div className='space-y-6 pt-1'>
					<div className='flex flex-wrap items-center gap-3 text-muted-foreground'>
						<div
							className={cn(
								"flex items-center gap-2 transition-colors",
								liked && "text-primary",
							)}
						>
							<Heart size={18} className={cn(liked && "fill-current")} />
							<span>{t("productDetail.badges.saved")}</span>
						</div>
						<span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700'>
							{t("productDetail.badges.cashOrCard")}
						</span>
					</div>

					<div className='space-y-4 rounded-[28px] border border-border/70 bg-background p-5'>
						<div className='grid grid-cols-[120px_1fr] gap-3 text-sm md:text-base'>
							<span className='text-muted-foreground'>product</span>
							<span className='font-medium text-foreground'>
								{product.title}
							</span>
						</div>
						<div className='grid grid-cols-[120px_1fr] gap-3 text-sm md:text-base'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.brand")}
							</span>
							<span className='font-medium text-foreground'>
								{product.brand}
							</span>
						</div>
						<div className='grid grid-cols-[120px_1fr] gap-3 text-sm md:text-base'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.category")}
							</span>
							<span className='font-medium text-foreground'>
								{product.category?.name ||
									t("productDetail.values.notSpecified")}
							</span>
						</div>
						<div className='grid grid-cols-[120px_1fr] gap-3 text-sm md:text-base'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.status")}
							</span>
							<span className='font-medium text-foreground'>
								{product.stock > 0
									? t("productDetail.values.inStock", {
											count: product.stock,
										})
									: t("productDetail.values.outOfStock")}
							</span>
						</div>
						<div className='grid grid-cols-[120px_1fr] gap-3 text-sm md:text-base'>
							<span className='text-muted-foreground'>Description</span>
							<span className='font-medium text-foreground'>
								{product.description || product.shortDescription}
							</span>
						</div>
					</div>

					<Link
						href='#moreInfo'
						className='inline-flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700'
					>
						{t("productDetail.actions.allSpecifications")}
						<ChevronRight size={16} />
					</Link>
				</div>

				<div className='space-y-4'>
					<div className='rounded-[30px] border border-border bg-white p-5 shadow-sm'>
						<p className='text-[20px] font-semibold text-foreground md:text-[28px]'>
							{formatPrice(product.price)} so&apos;m
						</p>

						<p className='mt-4 text-sm leading-6 text-muted-foreground'>
							{t("productDetail.summary.paymentDescription")}
						</p>

						<div className='mt-5 grid grid-cols-2 gap-3'>
							{/* <Button className='h-14 rounded-2xl bg-yellow-400 text-base font-semibold text-black hover:bg-yellow-300'>
								<ShoppingCart className='mr-2 h-5 w-5' />
								Buyurtma berish
							</Button> */}
							<Button asChild className='h-14 rounded-2xl'>
								<Link href={`/checkout/${product.slug ?? product.id}`}>
									<ShoppingCart className='mr-2 h-5 w-5' />
									{t("productDetail.actions.order")}
								</Link>
							</Button>

							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant='outline'
										className='h-14 rounded-2xl border-0 bg-slate-200 text-base font-semibold text-slate-700 hover:bg-slate-300'
									>
										{t("productDetail.actions.contact")}
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
													{t("productDetail.contact.tabs.contactMe")}
												</TabsTrigger>

												<TabsTrigger
													value='self'
													className='h-12 rounded-xl px-3 text-center text-sm font-medium whitespace-normal data-[state=active]:bg-white data-[state=active]:shadow-none'
												>
													{t("productDetail.contact.tabs.selfCall")}
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
														{t("productDetail.contact.fields.firstName")}{" "}
														<span className='text-yellow-500'>*</span>
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
														{t("productDetail.contact.fields.lastName")}{" "}
														<span className='text-yellow-500'>*</span>
													</Label>
													<Input
														id='surname'
														placeholder={t(
															"productDetail.contact.fields.lastName",
														)}
														className='h-14 w-full rounded-2xl border-slate-200 px-4 text-base shadow-none'
													/>
												</div>

												<div className='space-y-2'>
													<Label
														htmlFor='phone'
														className='text-sm text-slate-500'
													>
														{t("productDetail.contact.fields.phone")}{" "}
														<span className='text-yellow-500'>*</span>
													</Label>
													<Input
														id='phone'
														className='h-14 w-full rounded-2xl border-slate-200 px-4 text-base font-medium shadow-none'
													/>
												</div>

												<Button className='mt-2 h-14 w-full rounded-2xl bg-yellow-400 text-lg font-semibold text-black hover:bg-yellow-300'>
													{t("productDetail.actions.sendRequest")}
												</Button>
											</TabsContent>

											<TabsContent
												value='self'
												className='mt-0 block w-full space-y-5'
											>
												<div className='rounded-2xl border border-slate-200 px-4 py-4 text-lg text-slate-700'>
													{t("productDetail.labels.productCode")}{" "}
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
															{t("productDetail.contact.callCenter")}
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
								{t("productDetail.summary.finishPurchase")}
							</p>
							<div className='flex flex-wrap gap-3'>
								{(
									t("productDetail.summary.providers", {
										returnObjects: true,
									}) as string[]
								).map(provider => (
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

					<a
						href='https://yandex.com/maps/?rtext=~41.321114,69.273777'
						target='_blank'
						rel='noreferrer'
						className='flex items-center justify-between rounded-[26px] border border-border bg-white px-5 py-4 shadow-sm transition hover:border-primary/40 hover:shadow-md'
					>
						<div>
							<p className='text-lg font-semibold text-foreground'>
								{t("productDetail.pickup.title")}
							</p>
							<p className='text-sm text-blue-600'>
								{t("productDetail.pickup.availableStock", {
									count: product.stock,
								})}
							</p>
						</div>
						<ChevronRight className='text-muted-foreground' />
					</a>

					<div className='flex items-center justify-center gap-3 rounded-[26px] bg-slate-100 px-5 py-4 text-foreground'>
						<ShieldCheck className='text-slate-500' />
						<span className='font-medium'>
							{t("productDetail.badges.officialProduct")}
						</span>
					</div>
				</div>
			</div>

			<div id='moreInfo' className='mt-14 space-y-10'>
				<div className='space-y-3'>
					<h2 className='text-3xl font-semibold text-foreground'>
						{t("productDetail.specifications.title")}
					</h2>
					<p className='text-base leading-7 text-muted-foreground'>
						{t("productDetail.specifications.description")}
					</p>
				</div>

				<div className='grid gap-10 lg:grid-cols-2'>
					<div className='space-y-4'>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.brand")}
							</span>
							<span className='font-medium text-foreground'>
								{product.brand}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.category")}
							</span>
							<span className='font-medium text-foreground'>
								{product.category?.name ||
									t("productDetail.values.notSpecified")}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.code")}
							</span>
							<span className='font-medium text-foreground'>
								{product.code}
							</span>
						</div>
						<div className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'>
							<span className='text-muted-foreground'>
								{t("productDetail.labels.availability")}
							</span>
							<span className='font-medium text-foreground'>
								{product.stock > 0
									? t("productDetail.values.available")
									: t("productDetail.values.outOfStock")}
							</span>
						</div>
					</div>

					<div className='space-y-6'>
						{Object.keys(groupedSpecifications).length === 0 ? (
							<div className='rounded-3xl border border-dashed border-border p-6 text-muted-foreground'>
								{t("productDetail.specifications.empty")}
							</div>
						) : (
							Object.entries(groupedSpecifications).map(([group, items]) => (
								<div key={group} className='space-y-4'>
									<h3 className='text-xl font-semibold text-foreground'>
										{group}
									</h3>
									<div className='space-y-4'>
										{items.map(item => (
											<div
												key={`${group}-${item.label}`}
												className='grid grid-cols-[160px_1fr] gap-4 border-b border-dashed border-border pb-3'
											>
												<span className='text-muted-foreground'>
													{item.label}
												</span>
												<span className='font-medium text-foreground'>
													{item.value}
												</span>
											</div>
										))}
									</div>
								</div>
							))
						)}
					</div>
				</div>

				<div className='space-y-3'>
					<h3 className='text-2xl font-semibold text-foreground'>
						{t("productDetail.descriptionTitle")}
					</h3>
					<div className='space-y-4 text-base leading-8 text-foreground/85'>
						{product.description
							.split("\n")
							.filter(Boolean)
							.map(paragraph => (
								<p key={paragraph}>{paragraph}</p>
							))}
					</div>
				</div>
			</div>

			<ProductSection
				title={t("productDetail.relatedTitle")}
				products={relatedProducts}
				viewAllHref='/product'
			/>
		</div>
	);
}
