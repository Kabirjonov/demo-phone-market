"use client";

import { useMemo, useState } from "react";
import {
	Check,
	ChevronDown,
	ChevronDownIcon,
	ChevronRight,
	SlidersHorizontal,
	X,
} from "lucide-react";

import { hitProducts, slugifyProduct } from "@/mockInfo/data";
import { IProduct } from "@/type";
import ProductCard from "@/components/cards/product-card";

type FilterGroup = {
	title: string;
	key: string;
	items?: { label: string; value: string; count?: number }[];
};

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { mockData } from "../page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
const priceRanges = [
	{
		label: "300 000 - 2 000 000 so'm",
		value: "budget",
		min: 300000,
		max: 2000000,
	},
	{
		label: "2 000 000 - 5 000 000 so'm",
		value: "mid",
		min: 2000000,
		max: 5000000,
	},
	{
		label: "5 000 000 so'm+",
		value: "premium",
		min: 5000000,
		max: Number.POSITIVE_INFINITY,
	},
];

function getCategoryKey(product: IProduct) {
	const title = product.title.toLowerCase();

	if (
		title.includes("televizor") ||
		title.includes("tv") ||
		title.includes("stansiya") ||
		title.includes("karnay")
	) {
		return "tv-audio";
	}

	if (
		title.includes("namlagich") ||
		title.includes("havo") ||
		title.includes("muzlatgich") ||
		title.includes("kir yuvish")
	) {
		return "home-tech";
	}

	if (
		title.includes("telefon") ||
		title.includes("smartfon") ||
		title.includes("iphone") ||
		title.includes("galaxy")
	) {
		return "phones";
	}

	return "smart-devices";
}

function getCategoryTitle(category: string) {
	switch (category) {
		case "phones":
			return "Telefonlar";
		case "tv-audio":
			return "TV va audio";
		case "home-tech":
			return "Maishiy texnika";
		default:
			return "Smart qurilmalar";
	}
}

const filterGroups: FilterGroup[] = [
	{
		title: "Smartfon va telefonlar",
		key: "phones",
		items: [
			{ label: "Smartfonlar", value: "phones", count: 12 },
			{ label: "Flagman modellari", value: "phones" },
			{ label: "Aksessuarlar", value: "phones" },
		],
	},
	{
		title: "TV va audio",
		key: "tv-audio",
		items: [
			{ label: "Televizorlar", value: "tv-audio", count: 8 },
			{ label: "Karnay va stansiyalar", value: "tv-audio" },
			{ label: "Sound tizimlar", value: "tv-audio" },
		],
	},
	{
		title: "Maishiy texnika",
		key: "home-tech",
		items: [
			{ label: "Namlagichlar", value: "home-tech", count: 16 },
			{ label: "Uy uchun texnika", value: "home-tech" },
			{ label: "Iqlim qurilmalari", value: "home-tech" },
		],
	},
	{
		title: "Smart qurilmalar",
		key: "smart-devices",
		items: [
			{ label: "Aqlli qurilmalar", value: "smart-devices", count: 11 },
			{ label: "Stansiyalar", value: "smart-devices" },
			{ label: "Premium gadjetlar", value: "smart-devices" },
		],
	},
	{ title: "Brendlar", key: "brands" },
	{ title: "Narx", key: "price" },
	{ title: "Muddatli to'lov", key: "installment" },
];

export default function CatalogPage() {
	const [value, setValue] = useState([200, 800]);
	const [selectedCategory, setSelectedCategory] = useState("smart-devices");
	const [selectedSubcategory, setSelectedSubcategory] =
		useState("smart-devices");
	const [selectedPrice, setSelectedPrice] = useState("");
	const [sortBy, setSortBy] = useState("popular");

	const filteredProducts = useMemo(() => {
		const activeRange = priceRanges.find(
			range => range.value === selectedPrice,
		);

		const products = hitProducts.filter(product => {
			const category = getCategoryKey(product);
			const matchesCategory = selectedCategory
				? category === selectedCategory
				: true;
			const matchesSubcategory = selectedSubcategory
				? category === selectedSubcategory
				: true;
			const matchesPrice = activeRange
				? product.price >= activeRange.min && product.price <= activeRange.max
				: true;

			return matchesCategory && matchesSubcategory && matchesPrice;
		});

		return [...products].sort((left, right) => {
			if (sortBy === "price-low") return left.price - right.price;
			if (sortBy === "price-high") return right.price - left.price;
			if (sortBy === "monthly-low")
				return left.monthlyPrice - right.monthlyPrice;
			return (right.rating || 0) - (left.rating || 0);
		});
	}, [selectedCategory, selectedPrice, selectedSubcategory, sortBy]);

	const selectedCategoryGroup = filterGroups.find(
		group => group.key === selectedCategory,
	);

	return (
		<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='flex flex-wrap gap-x-2 my-3'>
				{mockData.map((item, i) => (
					<Link href={item.items[0]} key={item.id}>
						<Badge>{item.items[0]}</Badge>
					</Link>
				))}
			</div>

			<div className='grid gap-8 lg:grid-cols-[290px_minmax(0,1fr)]'>
				<aside className='h-fit rounded-[28px] border border-border/70 bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]'>
					<Collapsible
						defaultOpen
						className='mt-5  px-2 py-2'
						// className='w-full  text-left text-base font-medium text-foreground'
					>
						<CollapsibleTrigger asChild>
							<div className='group flex w-full '>
								Product details
								<ChevronDownIcon className='ml-auto group-data-[state=open]:rotate-180' />
							</div>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<Field className='w-full max-w-xs'>
								<FieldDescription>
									{/* Set your budget range ($
									<span className='font-medium tabular-nums'>
										{value[0]}
									</span> -{" "}
									<span className='font-medium tabular-nums'>{value[1]}</span>). */}
									<div className='grid grid-cols-2 gap-3 mb-3'>
										<div>
											<label className='text-sm text-muted-foreground'>
												dan
											</label>
											<Input
												type='number'
												value={value[0]}
												onChange={e =>
													setValue([
														Math.min(Number(e.target.value), value[1]),
														value[1],
													])
												}
											/>
										</div>

										<div>
											<label className='text-sm text-muted-foreground'>
												gacha
											</label>
											<Input
												type='number'
												value={value[1]}
												onChange={e =>
													setValue([
														value[0],
														Math.max(Number(e.target.value), value[0]),
													])
												}
											/>
										</div>
									</div>
									{/* <Input value={value[0]} />
									<Input value={value[1]} /> */}
								</FieldDescription>

								<Slider
									value={value}
									onValueChange={value => setValue(value as [number, number])}
									min={0}
									max={1000}
									step={10}
									className='mt-2 w-full'
									aria-label='Price Range'
								/>
							</Field>
						</CollapsibleContent>
					</Collapsible>

					<div className='mt-5 space-y-1'>
						{filterGroups.map(group => {
							const isExpanded = group.key === selectedCategory && group.items;

							return (
								<div
									key={group.key}
									className='rounded-2xl border border-transparent px-2 py-1 transition hover:border-yellow-100 hover:bg-yellow-50/50'
								>
									<button
										type='button'
										onClick={() => {
											if (!group.items) return;
											setSelectedCategory(group.key);
											setSelectedSubcategory(group.items[0].value);
										}}
										className='flex w-full items-center justify-between px-2 py-2 text-left text-base font-medium text-foreground'
									>
										<span>{group.title}</span>
										{group.items ? (
											<ChevronDown size={18} />
										) : (
											<ChevronRight
												size={18}
												className='text-muted-foreground'
											/>
										)}
									</button>

									{isExpanded ? (
										<div className='space-y-1 pb-2 pl-2 pt-1'>
											{/* @ts-ignore */}
											{group.items.map(item => {
												const isSelected = selectedSubcategory === item.value;

												return (
													<button
														key={`${group.key}-${item.label}`}
														type='button'
														onClick={() => setSelectedSubcategory(item.value)}
														className='flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-white'
													>
														<span className='flex items-center gap-3 text-sm text-foreground'>
															<span
																className={`flex h-4 w-4 items-center justify-center rounded border ${
																	isSelected
																		? "border-yellow-500 bg-yellow-400 text-black"
																		: "border-slate-300 bg-white"
																}`}
															>
																{isSelected ? <Check size={12} /> : null}
															</span>
															{item.label}
														</span>
														{item.count ? (
															<span className='text-sm text-muted-foreground'>
																{item.count}
															</span>
														) : null}
													</button>
												);
											})}
										</div>
									) : null}
								</div>
							);
						})}
					</div>
				</aside>

				<div className='space-y-6'>
					<div className='flex flex-col gap-4 rounded-[28px] border border-border/70 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] md:flex-row md:items-center md:justify-between'>
						<div className='space-y-3'>
							<p className='text-sm text-muted-foreground'>
								Showing{" "}
								<span className='font-semibold text-foreground'>
									{filteredProducts.length} results
								</span>{" "}
								from total{" "}
								<span className='font-semibold text-foreground'>
									{hitProducts.length}
								</span>{" "}
								for{" "}
								<span className='font-semibold text-foreground'>
									"{selectedCategoryGroup?.title || "Texnika"}"
								</span>
							</p>

							<div className='flex flex-wrap gap-2'>
								<span className='text-sm text-muted-foreground'>
									Applied Filters:
								</span>
								<span className='inline-flex items-center rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800'>
									{getCategoryTitle(selectedSubcategory)}
								</span>
								{selectedPrice ? (
									<button
										type='button'
										onClick={() => setSelectedPrice("")}
										className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700'
									>
										{
											priceRanges.find(range => range.value === selectedPrice)
												?.label
										}
										<X size={14} />
									</button>
								) : null}
							</div>
						</div>

						<div className='flex flex-wrap items-center gap-3'>
							<label className='text-sm text-muted-foreground'>Price:</label>
							<select
								value={selectedPrice}
								onChange={event => setSelectedPrice(event.target.value)}
								className='rounded-2xl border border-border bg-background px-4 py-2 text-sm outline-none transition focus:border-yellow-400'
							>
								<option value=''>All prices</option>
								{priceRanges.map(range => (
									<option key={range.value} value={range.value}>
										{range.label}
									</option>
								))}
							</select>

							<label className='text-sm text-muted-foreground'>Sort by</label>
							<select
								value={sortBy}
								onChange={event => setSortBy(event.target.value)}
								className='rounded-2xl border border-border bg-background px-4 py-2 text-sm outline-none transition focus:border-yellow-400'
							>
								<option value='popular'>Popular</option>
								<option value='price-low'>Price: Low to High</option>
								<option value='price-high'>Price: High to Low</option>
								<option value='monthly-low'>Monthly payment</option>
							</select>
						</div>
					</div>

					<div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
						{filteredProducts.map(product => (
							// <Link
							// 	key={product.id}
							// 	href={`/product/detail/${slugifyProduct(product.title)}`}
							// 	className='group rounded-[28px] border border-border/70 bg-white p-4 shadow-[0_16px_42px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(15,23,42,0.09)]'
							// >
							// 	<div className='relative overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(253,224,71,0.24),_transparent_55%),linear-gradient(180deg,#fafaf9_0%,#f5f5f4_100%)]'>
							// 		{product.badge ? (
							// 			<span className='absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white'>
							// 				{product.badge}
							// 			</span>
							// 		) : null}

							// 		<div className='flex h-[280px] items-center justify-center p-6'>
							// 			<Image
							// 				src={product.images[0]}
							// 				alt={product.title}
							// 				width={240}
							// 				height={240}
							// 				className='h-auto max-h-[240px] w-auto object-contain transition duration-300 group-hover:scale-105'
							// 			/>
							// 		</div>
							// 	</div>

							// 	<div className='mt-4 space-y-3'>
							// 		<div className='flex items-start justify-between gap-4'>
							// 			<h2 className='line-clamp-2 text-lg font-medium text-foreground'>
							// 				{product.title}
							// 			</h2>
							// 			<div className='text-right'>
							// 				<p className='text-2xl font-semibold text-foreground'>
							// 					{formatPrice(product.price)}
							// 				</p>
							// 			</div>
							// 		</div>

							// 		<p className='text-sm text-muted-foreground'>
							// 			{getCategoryTitle(getCategoryKey(product))}
							// 		</p>

							// 		<div className='flex items-center justify-between gap-4'>
							// 			<span className='rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800'>
							// 				{formatPrice(product.monthlyPrice)} /{" "}
							// 				{product.monthlyDuration} oy
							// 			</span>
							// 			<span className='text-sm text-muted-foreground'>
							// 				{product.reviewsText || "Sharh yo'q"}
							// 			</span>
							// 		</div>
							// 	</div>
							// </Link>
							<ProductCard product={product} key={product.id} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
