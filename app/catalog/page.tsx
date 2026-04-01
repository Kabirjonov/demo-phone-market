"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { buildCategoryTree } from "@/lib/category-tree";
import { resolveProductImage } from "@/lib/resolveProductImage";

export default function CatalogPage() {
	const { categories } = useCategories();
	const catalogSections = buildCategoryTree(categories);

	return (
		<section className='py-40'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
					{catalogSections.map(item => (
						<div
							key={item.id}
							// className='group rounded-2xl bg-secondary/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
							className='group cursor-pointer  p-4 group-hover:shadow rounded-2xl border border-border/70 dark:bg-secondary/30'
						>
							<Link
								href={`/catalog/${item.slug}`}
								className='block'
							>
								<div className='mb-4 flex h-[110px] items-start'>
									<Image
										src={resolveProductImage(item.images[0] || "/logo.png")}
										alt={item.name}
										width={90}
										height={90}
										className='h-[90px] w-[90px] object-contain transition-transform duration-300 group-hover:scale-105'
									/>
								</div>

								<h3 className='mb-5 text-[28px] font-semibold leading-[1.2] text-[#1f1f1f] transition-colors duration-200 group-hover:text-primary'>
									{item.name}
								</h3>
							</Link>

							<div className='space-y-3'>
								{item.items.map(subItem => (
									<Link
										key={subItem.id}
										href={`/catalog/${subItem.slug}`}
										className='cursor-pointer text-sm leading-[1.4] text-[#2b2b2b] flex flex-wrap transition-colors duration-200 hover:text-primary'
									>
										{subItem.name}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				{/* <ProductSection products={hitProducts} viewAllHref='/products' /> */}
			</div>
		</section>
	);
}
