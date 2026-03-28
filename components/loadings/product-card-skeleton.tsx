import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
	return (
		<div className=''>
			<div className='p-4 rounded-2xl border border-border/70 dark:bg-secondary/30'>
				<div className='rounded-3xl bg-muted/40 p-3'>
					<div className='relative h-[220px] overflow-hidden'>
						<div className='relative flex h-[220px] items-center justify-center'>
							<Skeleton className='h-[210px] w-[210px] rounded-xl' />

							<div className='absolute left-2 bottom-2'>
								<Skeleton className='h-7 w-20 rounded-lg' />
							</div>
						</div>
					</div>
				</div>

				<div className='mt-4 space-y-3'>
					<div className='space-y-2 min-h-[56px]'>
						<Skeleton className='h-5 w-full rounded-md' />
						<Skeleton className='h-5 w-3/4 rounded-md' />
					</div>

					<div className='flex items-center gap-2'>
						<Skeleton className='h-4 w-4 rounded-full' />
						<Skeleton className='h-4 w-10 rounded-md' />
						<Skeleton className='h-4 w-24 rounded-md' />
					</div>

					<div>
						<Skeleton className='h-8 w-44 rounded-full' />
					</div>

					<div className='flex items-end justify-between gap-3'>
						<Skeleton className='h-8 w-28 rounded-md' />
						<Skeleton className='h-10 w-10 rounded-full' />
					</div>
				</div>
			</div>
		</div>
	);
}
