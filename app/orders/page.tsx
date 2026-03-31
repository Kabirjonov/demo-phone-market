"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Package, ShoppingBag, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyOrders } from "@/hooks/useOrders";
import { useSessionStore } from "@/store/useSession.store";
import { IOrder } from "@/type";

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat("uz-UZ", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function paymentBadgeVariant(value: IOrder["paymentStatus"]) {
	switch (value) {
		case "PAID":
			return "default";
		case "FAILED":
			return "destructive";
		default:
			return "secondary";
	}
}

function deliveryBadgeVariant(value: IOrder["deliveryStatus"]) {
	switch (value) {
		case "DELIVERED":
			return "default";
		case "CANCELLED":
			return "destructive";
		default:
			return "secondary";
	}
}

export default function ProfileOrdersPage() {
	const router = useRouter();
	const user = useSessionStore(state => state.user);
	const isAuth = useSessionStore(state => state.isAuth);
	const [isReady, setIsReady] = useState(() =>
		useSessionStore.persist.hasHydrated(),
	);

	useEffect(() => {
		const unsubscribeHydrate = useSessionStore.persist.onHydrate(() => {
			setIsReady(false);
		});
		const unsubscribeFinishHydration =
			useSessionStore.persist.onFinishHydration(() => {
				setIsReady(true);
			});

		return () => {
			unsubscribeHydrate();
			unsubscribeFinishHydration();
		};
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		if (!isAuth) {
			router.replace("/auth");
		}
	}, [isAuth, isReady, router]);

	const numericUserId = useMemo(() => {
		if (!user?.id) {
			return null;
		}

		const parsed = Number(user.id);
		return Number.isFinite(parsed) ? parsed : null;
	}, [user?.id]);

	const { orders, loading, error } = useMyOrders(numericUserId, isReady && isAuth);

	if (!isReady || !isAuth || !user) {
		return (
			<section className='min-h-screen px-4 pb-24 pt-36'>
				<div className='container mx-auto max-w-6xl'>
					<div className='rounded-3xl border border-dashed p-8 text-center text-muted-foreground'>
						Buyurtmalar tekshirilmoqda...
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='min-h-screen px-4 pb-24 pt-36'>
			<div className='container mx-auto max-w-6xl space-y-6'>
				<div className='flex flex-col gap-4 rounded-[2rem] border bg-gradient-to-br from-background via-background to-muted/40 p-6 shadow-sm md:flex-row md:items-center md:justify-between'>
					<div className='space-y-2'>
						<Link
							href='/profile'
							className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'
						>
							<ArrowLeft className='size-4' />
							Profilga qaytish
						</Link>
						<h1 className='text-3xl font-semibold'>Buyurtmalar tarixi</h1>
						<p className='text-sm text-muted-foreground'>
							Sizning barcha buyurtmalaringiz shu yerda ko&apos;rinadi.
						</p>
					</div>

					<div className='flex flex-wrap gap-3'>
						<Badge variant='outline' className='px-4 py-2'>
							Jami: {orders.length}
						</Badge>
						<Badge variant='outline' className='px-4 py-2'>
							User ID: {user.id}
						</Badge>
					</div>
				</div>

				{numericUserId === null ? (
					<div className='rounded-3xl border border-dashed p-8 text-center text-muted-foreground'>
						Foydalanuvchi ID raqam formatida emas. `myOrders` query uchun
						numeric `userId` kerak.
					</div>
				) : null}

				{loading ? (
					<div className='grid gap-4'>
						{Array.from({ length: 3 }).map((_, index) => (
							<Card key={`order-skeleton-${index}`} className='rounded-3xl'>
								<CardContent className='p-6'>
									<div className='h-24 animate-pulse rounded-2xl bg-muted' />
								</CardContent>
							</Card>
						))}
					</div>
				) : null}

				{!loading && error ? (
					<div className='rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center text-destructive'>
						Buyurtmalarni yuklashda xatolik yuz berdi.
					</div>
				) : null}

				{!loading && !error && numericUserId !== null && orders.length === 0 ? (
					<div className='rounded-3xl border border-dashed p-10 text-center'>
						<div className='mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
							<ShoppingBag className='size-8' />
						</div>
						<h2 className='mt-5 text-2xl font-semibold'>Buyurtmalar hali yo&apos;q</h2>
						<p className='mt-2 text-sm text-muted-foreground'>
							Birinchi buyurtmangizdan keyin tarix shu sahifada chiqadi.
						</p>
						<Link
							href='/catalog'
							className='mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground'
						>
							Katalogni ko&apos;rish
						</Link>
					</div>
				) : null}

				{!loading && !error && orders.length > 0 ? (
					<div className='grid gap-4'>
						{orders.map(order => (
							<Card key={order.id} className='rounded-3xl border shadow-sm'>
								<CardHeader className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
									<div className='space-y-2'>
										<CardTitle className='flex flex-wrap items-center gap-3 text-2xl'>
											<span>Buyurtma #{order.id}</span>
											<Badge variant={paymentBadgeVariant(order.paymentStatus)}>
												{order.paymentStatus}
											</Badge>
											<Badge
												variant={deliveryBadgeVariant(order.deliveryStatus)}
											>
												{order.deliveryStatus}
											</Badge>
										</CardTitle>
										<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
											<span className='inline-flex items-center gap-2'>
												<CalendarDays className='size-4' />
												{formatDate(order.createdAt)}
											</span>
											<span className='inline-flex items-center gap-2'>
												<Truck className='size-4' />
												{order.deliveryMethod}
											</span>
											<span className='inline-flex items-center gap-2'>
												<Package className='size-4' />
												{order.items.length} ta mahsulot
											</span>
										</div>
									</div>

									<div className='text-left md:text-right'>
										<p className='text-sm text-muted-foreground'>Jami summa</p>
										<p className='text-2xl font-semibold'>
											{formatPrice(order.totalAmount)} so&apos;m
										</p>
									</div>
								</CardHeader>

								<CardContent className='space-y-4'>
									<div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
										<div className='rounded-2xl border bg-muted/20 p-4'>
											<p className='text-sm text-muted-foreground'>Telefon</p>
											<p className='mt-1 font-medium'>{order.phone}</p>
										</div>
										<div className='rounded-2xl border bg-muted/20 p-4'>
											<p className='text-sm text-muted-foreground'>Hudud</p>
											<p className='mt-1 font-medium'>
												{order.region}, {order.district}
											</p>
										</div>
										<div className='rounded-2xl border bg-muted/20 p-4'>
											<p className='text-sm text-muted-foreground'>To&apos;lov</p>
											<p className='mt-1 font-medium'>{order.paymentMethod}</p>
										</div>
										<div className='rounded-2xl border bg-muted/20 p-4'>
											<p className='text-sm text-muted-foreground'>Yetkazish</p>
											<p className='mt-1 font-medium'>{order.deliveryMethod}</p>
										</div>
									</div>

									<div className='rounded-2xl border p-4'>
										<p className='mb-3 text-sm text-muted-foreground'>
											Buyurtmadagi mahsulotlar
										</p>
										<div className='space-y-3'>
											{order.items.map(item => (
												<div
													key={item.id}
													className='flex flex-col gap-2 rounded-2xl border bg-muted/20 p-4 md:flex-row md:items-center md:justify-between'
												>
													<div>
														<p className='font-medium'>{item.productTitle}</p>
														<p className='text-sm text-muted-foreground'>
															Soni: {item.quantity} x{" "}
															{formatPrice(item.orderTimePrice)} so&apos;m
														</p>
													</div>
													<p className='text-sm font-semibold'>
														{formatPrice(item.totalPrice)} so&apos;m
													</p>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : null}
			</div>
		</section>
	);
}
