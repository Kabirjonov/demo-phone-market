"use client";

import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import ProductCard from "@/components/cards/product-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/formatPrice";
import { slugifyProduct } from "@/mockInfo/data";
import { IProduct } from "@/type";

const sortOptions = [
	{ label: "Tavsiya etilgan", value: "recommended" },
	{ label: "Narx: arzonidan", value: "price-low" },
	{ label: "Narx: qimmatidan", value: "price-high" },
	{ label: "Nomi bo'yicha", value: "title" },
] as const;

function normalizeSlug(value?: string | null) {
	return slugifyProduct(value ?? "");
}

function matchesCatalogSlug(product: IProduct, slug: string) {
	const normalizedSlug = normalizeSlug(slug);
	const categorySlug = normalizeSlug(product.category?.slug);
	const categoryName = normalizeSlug(product.category?.name);
	const brand = normalizeSlug(product.brand);
	const title = normalizeSlug(product.title);

	return (
		categorySlug === normalizedSlug ||
		categoryName === normalizedSlug ||
		brand === normalizedSlug ||
		title.includes(normalizedSlug)
	);
}

function humanizeSlug(slug: string) {
	return slug
		.split("-")
		.filter(Boolean)
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export default function CatalogSlugPage() {
	const params = useParams<{ slug: string }>();
	const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug ?? "";
	const { products, loading, error } = useProducts({ limit: 100 });

	const [search, setSearch] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("all");
	const [sortBy, setSortBy] =
		useState<(typeof sortOptions)[number]["value"]>("recommended");

	const matchedProducts = useMemo(() => {
		return products.filter(product => matchesCatalogSlug(product, slug));
	}, [products, slug]);

	const availableBrands = useMemo(() => {
		return [...new Set(matchedProducts.map(product => product.brand).filter(Boolean))];
	}, [matchedProducts]);

	const totalMinPrice = matchedProducts.length
		? Math.min(...matchedProducts.map(product => product.price))
		: 0;
	const totalMaxPrice = matchedProducts.length
		? Math.max(...matchedProducts.map(product => product.price))
		: 0;

	const [customPriceRange, setCustomPriceRange] = useState<[number, number] | null>(
		null,
	);

	const priceRange = useMemo<[number, number]>(() => {
		if (matchedProducts.length === 0) {
			return [0, 0];
		}

		if (!customPriceRange) {
			return [totalMinPrice, totalMaxPrice];
		}

		const nextMin = Math.max(totalMinPrice, customPriceRange[0]);
		const nextMax = Math.min(totalMaxPrice, customPriceRange[1]);

		return nextMin <= nextMax
			? [nextMin, nextMax]
			: [totalMinPrice, totalMaxPrice];
	}, [customPriceRange, matchedProducts.length, totalMaxPrice, totalMinPrice]);

	const filteredProducts = useMemo(() => {
		const query = search.toLowerCase().trim();
		const [min, max] = priceRange;

		const nextProducts = matchedProducts.filter(product => {
			const haystack = [
				product.title,
				product.brand,
				product.category?.name,
				product.shortDescription,
				product.description,
			]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();

			const matchesSearch = query ? haystack.includes(query) : true;
			const matchesBrand =
				selectedBrand === "all" ? true : product.brand === selectedBrand;
			const matchesPrice = product.price >= min && product.price <= max;

			return matchesSearch && matchesBrand && matchesPrice;
		});

		return [...nextProducts].sort((left, right) => {
			if (sortBy === "price-low") return left.price - right.price;
			if (sortBy === "price-high") return right.price - left.price;
			if (sortBy === "title") return left.title.localeCompare(right.title);
			return 0;
		});
	}, [matchedProducts, search, selectedBrand, priceRange, sortBy]);

	const pageTitle =
		matchedProducts[0]?.category?.name ??
		humanizeSlug(slug) ??
		"Katalog mahsulotlari";

	function clearFilters() {
		setSearch("");
		setSelectedBrand("all");
		setCustomPriceRange(null);
		setSortBy("recommended");
	}

	if (loading) {
		return (
			<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
				<div className='flex min-h-[50vh] items-center justify-center text-muted-foreground'>
					<Loader2 className='mr-2 h-5 w-5 animate-spin' />
					Mahsulotlar yuklanmoqda...
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
				<div className='rounded-[28px] border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive'>
					Katalog ma&apos;lumotlarini yuklab bo&apos;lmadi.
				</div>
			</section>
		);
	}

	return (
		<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='mb-6 flex flex-wrap items-center gap-3'>
				<Link
					href='/catalog'
					className='rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5'
				>
					Katalog
				</Link>
				<Badge className='rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground'>
					{pageTitle}
				</Badge>
			</div>

			<div className='mb-8 overflow-hidden rounded-[32px] border border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_30%),linear-gradient(135deg,rgba(255,247,237,0.95),rgba(255,255,255,1)_45%,rgba(255,247,237,0.88))] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.06)]'>
				<div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
					<div className='space-y-3'>
						<div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur'>
							<SlidersHorizontal className='h-4 w-4 text-primary' />
							Real katalog natijalari
						</div>
						<h1 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
							{pageTitle}
						</h1>
						<p className='max-w-3xl text-sm text-muted-foreground md:text-base'>
							Slug bo&apos;yicha backenddan kelgan haqiqiy mahsulotlar
							ko&apos;rsatilmoqda. Hozir {filteredProducts.length} ta mos mahsulot
							topildi.
						</p>
					</div>

					<div className='flex flex-wrap gap-2'>
						<Badge
							variant='outline'
							className='rounded-full border-primary/20 bg-white/75 px-4 py-2'
						>
							Jami: {matchedProducts.length}
						</Badge>
						<Badge
							variant='outline'
							className='rounded-full border-primary/20 bg-white/75 px-4 py-2'
						>
							Brendlar: {availableBrands.length}
						</Badge>
						<Badge
							variant='outline'
							className='rounded-full border-primary/20 bg-white/75 px-4 py-2'
						>
							Narx: {formatPrice(totalMinPrice)} - {formatPrice(totalMaxPrice)}
						</Badge>
					</div>
				</div>
			</div>

			<div className='grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]'>
				<aside className='h-fit rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(249,250,251,0.96))] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]'>
					<div className='space-y-5'>
						<div className='space-y-2'>
							<label className='text-sm font-medium text-foreground'>
								Qidiruv
							</label>
							<div className='relative'>
								<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									value={search}
									onChange={event => setSearch(event.target.value)}
									placeholder='Nomi yoki brend bo‘yicha'
									className='pl-9'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium text-foreground'>Brend</label>
							<select
								value={selectedBrand}
								onChange={event => setSelectedBrand(event.target.value)}
								className='h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary'
							>
								<option value='all'>Barcha brendlar</option>
								{availableBrands.map(brand => (
									<option key={brand} value={brand}>
										{brand}
									</option>
								))}
							</select>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium text-foreground'>Narx oralig‘i</label>
							<div className='rounded-[24px] border border-primary/10 bg-primary/5 p-4'>
								<div className='mb-4 grid grid-cols-2 gap-3'>
									<div className='rounded-2xl bg-background px-3 py-2'>
										<p className='text-xs text-muted-foreground'>dan</p>
										<p className='mt-1 text-sm font-semibold text-foreground'>
											{formatPrice(priceRange[0])} so&apos;m
										</p>
									</div>
									<div className='rounded-2xl bg-background px-3 py-2'>
										<p className='text-xs text-muted-foreground'>gacha</p>
										<p className='mt-1 text-sm font-semibold text-foreground'>
											{formatPrice(priceRange[1])} so&apos;m
										</p>
									</div>
								</div>
								<Slider
									value={priceRange}
									onValueChange={value =>
										setCustomPriceRange(value as [number, number])
									}
									min={totalMinPrice}
									max={Math.max(totalMaxPrice, totalMinPrice + 1)}
									step={50000}
									className='w-full'
									aria-label='Price range'
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium text-foreground'>Saralash</label>
							<select
								value={sortBy}
								onChange={event =>
									setSortBy(
										event.target.value as (typeof sortOptions)[number]["value"],
									)
								}
								className='h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary'
							>
								{sortOptions.map(option => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<button
							type='button'
							onClick={clearFilters}
							className='inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90'
						>
							<X className='h-4 w-4' />
							Filterlarni tozalash
						</button>
					</div>
				</aside>

				<div className='space-y-6'>
					<div className='rounded-[28px] border border-border/70 bg-[linear-gradient(135deg,rgba(255,247,237,0.9),rgba(255,255,255,1))] p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]'>
						<p className='text-sm text-muted-foreground'>
							Topildi{" "}
							<span className='font-semibold text-foreground'>
								{filteredProducts.length}
							</span>{" "}
							ta mahsulot. Tanlangan bo‘lim:{" "}
							<span className='font-semibold text-foreground'>{pageTitle}</span>
						</p>
					</div>

					{filteredProducts.length === 0 ? (
						<div className='rounded-[28px] border border-dashed border-primary/20 bg-primary/5 p-10 text-center text-muted-foreground'>
							Bu slug uchun mos real mahsulot topilmadi.
						</div>
					) : (
						<div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
							{filteredProducts.map(product => (
								<ProductCard product={product} key={product.id} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
