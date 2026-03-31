import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
	return (
		<div className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='mb-8 flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-center lg:justify-between'>
				<div className='space-y-3'>
					<Skeleton className='h-6 w-56 rounded-md' />
					<Skeleton className='h-4 w-80 max-w-full rounded-md' />
				</div>
				<div className='flex items-center gap-3'>
					<Skeleton className='h-8 w-28 rounded-lg' />
					<Skeleton className='h-5 w-24 rounded-md' />
				</div>
			</div>

			<div className='grid gap-8 xl:grid-cols-[1.1fr_0.9fr_360px]'>
				<div className='grid gap-5 md:grid-cols-[88px_minmax(0,1fr)]'>
					<div className='order-2 flex gap-3 md:order-1 md:flex-col'>
						{Array.from({ length: 4 }).map((_, index) => (
							<Skeleton
								key={`product-detail-thumb-skeleton-${index}`}
								className='h-20 w-20 rounded-2xl'
							/>
						))}
					</div>

					<div className='order-1 flex min-h-[420px] items-center justify-center rounded-[32px] border border-border/70 bg-white p-6 md:order-2'>
						<Skeleton className='h-[340px] w-full rounded-[28px]' />
					</div>
				</div>

				<div className='space-y-6 pt-1'>
					<div className='flex gap-3'>
						<Skeleton className='h-6 w-32 rounded-full' />
						<Skeleton className='h-6 w-28 rounded-full' />
					</div>

					<div className='space-y-4 rounded-[28px] border border-border/70 bg-background p-5'>
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={`product-detail-info-skeleton-${index}`}
								className='grid grid-cols-[120px_1fr] gap-3'
							>
								<Skeleton className='h-5 w-24 rounded-md' />
								<Skeleton className='h-5 w-full rounded-md' />
							</div>
						))}
					</div>

					<Skeleton className='h-5 w-44 rounded-md' />
				</div>

				<div className='space-y-4'>
					<div className='rounded-[30px] border border-border bg-white p-5 shadow-sm'>
						<Skeleton className='h-9 w-40 rounded-md' />
						<Skeleton className='mt-4 h-16 w-full rounded-xl' />
						<div className='mt-5 grid grid-cols-2 gap-3'>
							<Skeleton className='h-14 rounded-2xl' />
							<Skeleton className='h-14 rounded-2xl' />
						</div>
						<div className='mt-6 border-t border-border pt-5'>
							<Skeleton className='h-5 w-36 rounded-md' />
							<div className='mt-4 flex flex-wrap gap-2'>
								{Array.from({ length: 4 }).map((_, index) => (
									<Skeleton
										key={`product-detail-provider-skeleton-${index}`}
										className='h-10 w-24 rounded-2xl'
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
