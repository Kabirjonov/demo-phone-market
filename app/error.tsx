"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string };
	unstable_retry: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<section className='mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1440px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-10'>
			<div className='mb-8 flex h-28 w-28 items-center justify-center rounded-[32px] bg-amber-100 text-amber-500 shadow-[0_24px_60px_rgba(245,158,11,0.18)]'>
				<TriangleAlert size={48} />
			</div>

			<div className='max-w-2xl space-y-4'>
				<h1 className='text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
					Kutilmagan xatolik yuz berdi
				</h1>
				<p className='text-lg leading-8 text-muted-foreground'>
					Sahifa vaqtincha ishlamayapti yoki ma&apos;lumotni yuklashda muammo
					chiqdi. Qayta urinib ko&apos;ring yoki bosh sahifaga qayting.
				</p>
			</div>

			<div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
				<Button
					onClick={() => unstable_retry()}
					className='h-12 rounded-2xl px-5 text-base'
				>
					<RotateCcw />
					Qayta urinish
				</Button>
				<Button
					asChild
					variant='outline'
					className='h-12 rounded-2xl px-5 text-base'
				>
					<Link href='/'>
						<Home />
						Asosiy sahifa
					</Link>
				</Button>
			</div>

			{error.digest ? (
				<p className='mt-6 text-sm text-muted-foreground'>
					Xatolik kodi: {error.digest}
				</p>
			) : null}
		</section>
	);
}
