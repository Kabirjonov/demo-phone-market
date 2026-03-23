import Link from "next/link";
import { notFound } from "next/navigation";
import {
	CalendarDays,
	ChevronRight,
	Newspaper,
	Sparkles,
	Tag,
} from "lucide-react";
import { promotions } from "@/mockInfo/data";

function decodePromotionSlug(slug: string) {
	return decodeURIComponent(slug).toLowerCase().replace(/\s+/g, "-");
}

export function generateStaticParams() {
	return promotions.map(item => ({
		slug: item.slug,
	}));
}

export default async function PromotionsPageOne({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	console.log("slug", slug);
	const currentPromotion = promotions.find(
		item => item.slug === decodePromotionSlug(slug),
	);
	console.log("currentPromotion", currentPromotion);
	if (!currentPromotion) {
		notFound();
	}

	const otherPromotions = promotions.filter(
		item => item.slug !== currentPromotion.slug,
	);

	return (
		<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]'>
				<div className='space-y-8'>
					<h1 className='text-3xl font-semibold tracking-tight text-foreground md:text-5xl'>
						{currentPromotion.title}
					</h1>

					<div className='rounded-[24px] bg-muted/40 p-5'>
						<div className='flex items-start gap-3'>
							<CalendarDays className='mt-1 text-muted-foreground' />
							<div className='space-y-1'>
								<p className='text-lg text-muted-foreground'>
									{currentPromotion.period}
								</p>
								<p className='text-xl font-semibold text-foreground'>
									{currentPromotion.daysLeft} kun qoldi
								</p>
							</div>
						</div>
					</div>

					<div className='overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(135deg,#fff7d6_0%,#ffffff_42%,#fff2b3_100%)] p-6 shadow-sm'>
						<div className='grid gap-6 md:grid-cols-[1.4fr_0.9fr] md:items-center'>
							<div className='space-y-4'>
								<div className='inline-flex rounded-[26px] bg-[#ffbf00] px-6 py-3 text-3xl font-black text-black shadow-[8px_8px_0_rgba(0,0,0,0.08)] md:text-6xl'>
									Ustamasiz
								</div>
								<div className='inline-flex -translate-y-2 rounded-[22px] bg-red-500 px-5 py-2 text-2xl font-black text-white md:text-4xl'>
									muddatli to&apos;lov!
								</div>
							</div>

							<div className='rounded-[28px] bg-[#ffbf00] p-5 text-black shadow-[8px_8px_0_rgba(0,0,0,0.08)]'>
								<div className='grid grid-cols-3 gap-3 text-center'>
									<div>
										<p className='text-4xl font-black md:text-6xl'>0%</p>
										<p className='text-sm font-semibold'>bosh to&apos;lov</p>
									</div>
									<div>
										<p className='text-4xl font-black md:text-6xl'>0%</p>
										<p className='text-sm font-semibold'>ustama</p>
									</div>
									<div>
										<p className='text-4xl font-black md:text-6xl'>12</p>
										<p className='text-sm font-semibold'>oyga bo&apos;lib</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-5 text-lg leading-8 text-foreground/90'>
						<p className='text-xl font-semibold'>{currentPromotion.kicker}</p>
						{currentPromotion.description.map(text => (
							<p key={text}>{text}</p>
						))}
					</div>

					<div className='grid gap-5 md:grid-cols-3'>
						{currentPromotion.highlights.map(item => (
							<div
								key={item}
								className='rounded-[24px] border border-border bg-white p-5 shadow-sm'
							>
								<div className='mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600'>
									<Tag size={20} />
								</div>
								<p className='text-base font-medium leading-7 text-foreground'>
									{item}
								</p>
							</div>
						))}
					</div>

					<div className='grid gap-6 md:grid-cols-2'>
						<div className='rounded-[28px] border border-border bg-white p-6 shadow-sm'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600'>
									<Newspaper size={20} />
								</div>
								<h2 className='text-2xl font-semibold text-foreground'>
									{currentPromotion.newsTitle}
								</h2>
							</div>
							<p className='text-base leading-7 text-muted-foreground'>
								{currentPromotion.newsText}
							</p>
						</div>

						<div className='rounded-[28px] border border-border bg-white p-6 shadow-sm'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-600'>
									<Sparkles size={20} />
								</div>
								<h2 className='text-2xl font-semibold text-foreground'>
									{currentPromotion.opportunityTitle}
								</h2>
							</div>
							<p className='text-base leading-7 text-muted-foreground'>
								{currentPromotion.opportunityText}
							</p>
						</div>
					</div>

					<div className='space-y-5'>
						<h2 className='text-3xl font-semibold text-foreground'>
							Aksiyadagi mahsulotlar
						</h2>

						<div className='grid gap-5 md:grid-cols-3'>
							{currentPromotion.products.map(product => (
								<div
									key={product.name}
									className='rounded-[28px] border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1'
								>
									<span className='mb-4 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700'>
										{product.tag}
									</span>
									<h3 className='min-h-14 text-lg font-semibold leading-7 text-foreground'>
										{product.name}
									</h3>
									<p className='mt-5 text-2xl font-bold text-foreground'>
										{product.price}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<aside className='rounded-[28px] border border-border bg-white p-6 shadow-sm lg:sticky lg:top-28 lg:h-fit'>
					<h2 className='text-3xl font-semibold text-foreground'>Aksiyalar</h2>
					<div className='mt-6 divide-y divide-border'>
						{promotions.map(item => {
							const isActive = item.slug === currentPromotion.slug;

							return (
								<Link
									key={item.slug}
									href={`/promotions/${item.slug}`}
									className='flex items-start justify-between gap-4 py-5 transition hover:text-blue-600'
								>
									<div>
										<p
											className={`text-2xl font-semibold ${
												isActive ? "text-blue-600" : "text-foreground"
											}`}
										>
											{item.title}
										</p>
										<p className='mt-1 text-lg text-muted-foreground'>
											{item.period}
										</p>
									</div>
									<ChevronRight
										className={
											isActive ? "text-blue-600" : "text-muted-foreground"
										}
									/>
								</Link>
							);
						})}
					</div>

					{otherPromotions.length > 0 ? (
						<div className='mt-6 rounded-[22px] bg-muted/40 p-5'>
							<p className='text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
								Ko&apos;proq imkoniyatlar
							</p>
							<p className='mt-3 text-base leading-7 text-foreground/80'>
								Barcha aksiyalar va chegirmalarni kuzatib boring, eng foydali
								takliflarni birinchi bo&apos;lib qo&apos;lga kiriting.
							</p>
						</div>
					) : null}
				</aside>
			</div>
		</section>
	);
}
