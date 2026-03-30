import Link from "next/link";
import { Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
// import ProductSection from "@/components/sections/Products";
// import { useProducts } from "@/hooks/useProducts";

function ErrorRobot() {
	return (
		<div className='relative h-[360px] w-full max-w-[420px]'>
			<div className='absolute inset-0'>
				<div className='absolute left-6 top-24 h-5 w-5 rounded-full bg-slate-200/70' />
				<div className='absolute left-14 top-10 h-8 w-8 rounded-full bg-slate-300/80' />
				<div className='absolute left-0 top-40 h-10 w-10 rounded-full bg-slate-200/50' />
				<div className='absolute right-10 top-22 h-12 w-12 rounded-full bg-slate-200/70' />
				<div className='absolute right-18 top-132 h-8 w-8 rounded-full bg-slate-200/60' />
				<div className='absolute right-2 top-72 h-9 w-9 rounded-full bg-slate-200/50' />
			</div>

			<div className='absolute left-12 top-4 h-28 w-28 -rotate-12 rounded-[28px] border-[6px] border-[#ffbe0b] bg-[#ffc31f] shadow-[0_22px_45px_rgba(255,190,11,0.22)]'>
				<div className='absolute left-4 top-4 h-2 w-2 rounded-full bg-slate-700' />
				<div className='absolute right-4 top-4 h-2 w-2 rounded-full bg-slate-700' />
				<div className='absolute left-5 top-9 h-14 w-8 rounded-full bg-slate-700' />
				<div className='absolute right-5 top-9 h-14 w-8 rounded-full bg-slate-700' />
				<div className='absolute left-[54px] top-[-18px] h-6 w-1 rounded-full bg-slate-700' />
				<div className='absolute left-[66px] top-[-24px] h-4 w-4 rounded-full bg-slate-700' />
			</div>

			<div className='absolute bottom-4 left-1/2 h-[210px] w-[160px] -translate-x-1/2'>
				<div className='absolute left-1/2 top-0 h-24 w-6 -translate-x-1/2 rounded-full bg-[#ffc31f]' />
				<div className='absolute left-1/2 top-12 h-[110px] w-[126px] -translate-x-1/2 rounded-[28px] border-[6px] border-[#e7a700] bg-[#ffc31f] shadow-[0_24px_50px_rgba(255,190,11,0.2)]'>
					<div className='absolute left-4 top-4 flex gap-2'>
						<span className='h-2.5 w-2.5 rounded-full bg-white' />
						<span className='h-2.5 w-2.5 rounded-full bg-slate-700/70' />
					</div>
					<div className='absolute left-1/2 top-7 h-14 w-14 -translate-x-1/2 rounded-full bg-white/80 ring-4 ring-white/50'>
						<div className='absolute bottom-7 left-1/2 h-1 w-8 origin-left -translate-x-1/2 rounded-full bg-slate-700' />
					</div>
					<div className='absolute bottom-4 left-4 right-4 h-8 rounded-md border border-[#c48b00] bg-[#f6b800]' />
				</div>
				<div className='absolute bottom-0 left-6 h-16 w-8 rounded-t-xl bg-[#ffc31f]' />
				<div className='absolute bottom-0 right-6 h-16 w-8 rounded-t-xl bg-[#ffc31f]' />
				<div className='absolute bottom-0 left-0 h-3 w-14 rounded-full bg-[#ffc31f]' />
				<div className='absolute bottom-0 right-0 h-3 w-14 rounded-full bg-[#ffc31f]' />
				<div className='absolute right-[-42px] top-[72px] h-12 w-24 rounded-r-full border-y-[6px] border-r-[6px] border-[#e7a700] bg-[#ffc31f]' />
				<div className='absolute left-[-54px] bottom-[18px] h-5 w-20 rounded-l-full border-y-[6px] border-l-[6px] border-[#e7a700] bg-[#ffc31f]' />
			</div>
		</div>
	);
}

export default function NotFound() {
	// const { products, loading, error } = useProducts();

	return (
		<section className='mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-10'>
			<ErrorRobot />

			<div className='max-w-2xl space-y-4'>
				<h1 className='text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
					Sahifa topilmadi!
				</h1>
				<p className='text-lg leading-8 text-muted-foreground'>
					Siz noto&apos;g&apos;ri manzilni kiritgan bo&apos;lishingiz mumkin.
					Qidiruvdan foydalanib ko&apos;ring yoki asosiy sahifaga o&apos;ting.
				</p>
			</div>

			<div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
				<Button asChild className='h-12 rounded-2xl px-5 text-base'>
					<Link href='/'>
						<Home />
						Asosiy sahifa
					</Link>
				</Button>
				<Button
					asChild
					variant='outline'
					className='h-12 rounded-2xl px-5 text-base'
				>
					<Link href='/catalog'>
						<Search />
						Katalogni ko&apos;rish
					</Link>
				</Button>
			</div>
			{/* <ProductSection
				products={products.slice(0, 10)}
				loading={loading}
				error={!!error}
				viewAllHref='/catalog'
			/> */}
		</section>
	);
}
