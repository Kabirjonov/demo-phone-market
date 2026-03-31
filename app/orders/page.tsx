"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
	ArrowLeft,
	CalendarDays,
	CheckCircle2,
	CreditCard,
	MapPin,
	Package2,
	ShoppingBag,
	Truck,
	UserRound,
	Wallet,
	XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMyOrders } from "@/hooks/useOrders";
import { cn } from "@/lib/utils";
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

function formatEnumLabel(value: string) {
	return value
		.toLowerCase()
		.split("_")
		.map(part => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function paymentBadgeClass(value: IOrder["paymentStatus"]) {
	switch (value) {
		case "PAID":
			return "border-emerald-200 bg-emerald-50 text-emerald-700";
		case "FAILED":
			return "border-rose-200 bg-rose-50 text-rose-700";
		default:
			return "border-amber-200 bg-amber-50 text-amber-700";
	}
}

function deliveryBadgeClass(value: IOrder["deliveryStatus"]) {
	switch (value) {
		case "DELIVERED":
			return "border-emerald-200 bg-emerald-50 text-emerald-700";
		case "CANCELLED":
			return "border-rose-200 bg-rose-50 text-rose-700";
		case "SHIPPED":
			return "border-sky-200 bg-sky-50 text-sky-700";
		default:
			return "border-orange-200 bg-orange-50 text-orange-700";
	}
}

function OrderInfoCard({
	icon: Icon,
	label,
	value,
}: {
	icon: typeof Truck;
	label: string;
	value: string;
}) {
	return (
		<div className='rounded-[24px] border border-border/70 bg-white/85 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur'>
			<div className='mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
				<Icon className='size-5' />
			</div>
			<p className='text-sm text-muted-foreground'>{label}</p>
			<p className='mt-1 text-base font-semibold text-foreground'>{value}</p>
		</div>
	);
}

export default function ProfileOrdersPage() {
	const { t } = useTranslation();
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

	const { orders, loading, error } = useMyOrders(
		numericUserId,
		isReady && isAuth,
	);

	const stats = useMemo(() => {
		return {
			total: orders.length,
			pending: orders.filter(order => order.paymentStatus === "PENDING").length,
			delivered: orders.filter(order => order.deliveryStatus === "DELIVERED")
				.length,
			totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
		};
	}, [orders]);

	if (!isReady || !isAuth || !user) {
		return (
			<section className='min-h-screen px-4 pb-24 pt-36'>
				<div className='container mx-auto max-w-6xl'>
					<div className='rounded-[32px] border border-dashed p-10 text-center text-muted-foreground'>
						{t("ordersPage.checking")}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.14),transparent_28%),linear-gradient(180deg,rgba(255,247,237,0.68),rgba(255,255,255,1)_26%)] px-4 pb-24 pt-36'>
			<div className='container mx-auto max-w-6xl space-y-6'>
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.35 }}
					className='overflow-hidden rounded-[32px] border border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent_26%),linear-gradient(135deg,rgba(255,247,237,0.98),rgba(255,255,255,1)_55%,rgba(255,244,230,0.92))] p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)]'
				>
					<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						<div className='space-y-3'>
							<Link
								href='/profile'
								className='inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/30 hover:text-foreground'
							>
								<ArrowLeft className='size-4' />
								{t("ordersPage.backToProfile")}
							</Link>
							<div className='flex items-center gap-3'>
								<div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_28px_rgba(249,115,22,0.25)]'>
									<ShoppingBag className='size-7' />
								</div>
								<div>
									<h1 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
										{t("ordersPage.title")}
									</h1>
									<p className='mt-1 max-w-2xl text-sm text-muted-foreground md:text-base'>
										{t("ordersPage.description")}
									</p>
								</div>
							</div>
						</div>

						<div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
							<OrderInfoCard
								icon={Package2}
								label={t("ordersPage.stats.totalOrders")}
								value={`${stats.total}`}
							/>
							<OrderInfoCard
								icon={Wallet}
								label={t("ordersPage.stats.pending")}
								value={`${stats.pending}`}
							/>
							<OrderInfoCard
								icon={CheckCircle2}
								label={t("ordersPage.stats.delivered")}
								value={`${stats.delivered}`}
							/>
							<OrderInfoCard
								icon={CreditCard}
								label={t("ordersPage.stats.totalSpent")}
								value={formatPrice(stats.totalAmount)}
							/>
						</div>
					</div>
				</motion.div>

				{numericUserId === null ? (
					<div className='rounded-[28px] border border-dashed border-amber-300 bg-amber-50 p-8 text-center text-amber-700'>
						{t("ordersPage.invalidUserId")}
					</div>
				) : null}

				{loading ? (
					<div className='grid gap-4'>
						{Array.from({ length: 3 }).map((_, index) => (
							<div
								key={`order-skeleton-${index}`}
								className='h-56 animate-pulse rounded-[28px] border border-border/70 bg-white/70'
							/>
						))}
					</div>
				) : null}

				{!loading && error ? (
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						className='rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-center text-rose-700'
					>
						<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100'>
							<XCircle className='size-7' />
						</div>
						{t("ordersPage.error")}
					</motion.div>
				) : null}

				{!loading && !error && numericUserId !== null && orders.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						className='rounded-[32px] border border-dashed border-primary/25 bg-white/85 p-10 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]'
					>
						<div className='mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
							<ShoppingBag className='size-8' />
						</div>
						<h2 className='mt-5 text-2xl font-semibold'>
							{t("ordersPage.empty.title")}
						</h2>
						<p className='mt-2 text-sm text-muted-foreground'>
							{t("ordersPage.empty.description")}
						</p>
						<Link
							href='/catalog'
							className='mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_14px_30px_rgba(249,115,22,0.24)] transition hover:-translate-y-0.5 hover:bg-primary/90'
						>
							{t("ordersPage.empty.cta")}
						</Link>
					</motion.div>
				) : null}

				{!loading && !error && orders.length > 0 ? (
					<div className='space-y-5'>
						{orders.map((order, index) => (
							<motion.div
								key={order.id}
								initial={{ opacity: 0, y: 24 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, delay: index * 0.06 }}
							>
								<Card className='overflow-hidden rounded-[32px] border-border/70 bg-white/88 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur'>
									<div className='h-1.5 w-full bg-[linear-gradient(90deg,rgba(249,115,22,1),rgba(251,146,60,0.55),rgba(255,237,213,0.4))]' />
									<CardHeader className='gap-5 border-b border-border/60 bg-[linear-gradient(180deg,rgba(255,247,237,0.95),rgba(255,255,255,0.95))]'>
										<div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
											<div className='space-y-3'>
												<div className='flex flex-wrap items-center gap-3'>
													<CardTitle className='text-2xl font-semibold text-foreground'>
														{t("ordersPage.orderTitle", { id: order.id })}
													</CardTitle>
													<Badge
														variant='outline'
														className={cn(
															"rounded-full px-3 py-1 text-xs font-semibold",
															paymentBadgeClass(order.paymentStatus),
														)}
													>
														<CreditCard className='mr-1 size-3.5' />
														{formatEnumLabel(order.paymentStatus)}
													</Badge>
													<Badge
														variant='outline'
														className={cn(
															"rounded-full px-3 py-1 text-xs font-semibold",
															deliveryBadgeClass(order.deliveryStatus),
														)}
													>
														<Truck className='mr-1 size-3.5' />
														{formatEnumLabel(order.deliveryStatus)}
													</Badge>
												</div>

												<div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
													<span className='inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1.5'>
														<CalendarDays className='size-4 text-primary' />
														{formatDate(order.createdAt)}
													</span>
													<span className='inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1.5'>
														<Package2 className='size-4 text-primary' />
														{t("ordersPage.itemsCount", {
															count: order.items.length,
														})}
													</span>
												</div>
											</div>

											<div className='rounded-[24px] border border-primary/15 bg-white px-5 py-4 text-left shadow-sm lg:min-w-[220px] lg:text-right'>
												<p className='text-sm text-muted-foreground'>
													{t("ordersPage.totalAmount")}
												</p>
												<p className='mt-1 text-3xl font-bold tracking-tight text-foreground'>
													{formatPrice(order.totalAmount)} so&apos;m
												</p>
											</div>
										</div>
									</CardHeader>

									<CardContent className='space-y-5 p-6'>
										<div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
											<OrderInfoCard
												icon={CreditCard}
												label={t("ordersPage.fields.payment")}
												value={formatEnumLabel(order.paymentMethod)}
											/>
											<OrderInfoCard
												icon={Truck}
												label={t("ordersPage.fields.delivery")}
												value={formatEnumLabel(order.deliveryMethod)}
											/>
											<OrderInfoCard
												icon={MapPin}
												label={t("ordersPage.fields.region")}
												value={`${order.region}, ${order.district}`}
											/>
											<OrderInfoCard
												icon={UserRound}
												label={t("ordersPage.fields.phone")}
												value={order.phone}
											/>
										</div>

										<div className='rounded-[28px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(249,250,251,0.9))] p-5'>
											<div className='mb-4 flex items-center justify-between gap-3'>
												<div>
													<p className='text-sm text-muted-foreground'>
														{t("ordersPage.fields.items")}
													</p>
													<h3 className='text-lg font-semibold text-foreground'>
														{t("ordersPage.itemsCount", {
															count: order.items.length,
														})}
													</h3>
												</div>
												<div className='rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
													#{order.id}
												</div>
											</div>

											<div className='space-y-3'>
												{order.items.map(item => (
													<Link
														href={
															item.product?.slug
																? `/product/${item.product.slug}`
																: item.productId
																	? `/product/${item.productId}`
																	: "#"
														}
														key={item.id}
														className='block'
													>
														<motion.div
															whileHover={{ y: -2 }}
															className='flex flex-col gap-3 rounded-[24px] border border-border/70 bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.04)] transition hover:border-primary/30 md:flex-row md:items-center md:justify-between'
														>
															<div className='flex items-start gap-3'>
																<div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
																	<Package2 className='size-5' />
																</div>
																<div>
																	<p className='font-semibold text-foreground'>
																		{item.productTitle}
																	</p>
																	<p className='mt-1 text-sm text-muted-foreground'>
																		{t("ordersPage.itemQuantity", {
																			quantity: item.quantity,
																		})}{" "}
																		x {formatPrice(item.orderTimePrice)}{" "}
																		so&apos;m
																	</p>
																</div>
															</div>

															<div className='text-left md:text-right'>
																<p className='text-xs uppercase tracking-[0.18em] text-muted-foreground'>
																	{t("ordersPage.subtotal")}
																</p>
																<p className='text-base font-semibold text-foreground'>
																	{formatPrice(item.totalPrice)} so&apos;m
																</p>
															</div>
														</motion.div>
													</Link>
												))}
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				) : null}
			</div>
		</section>
	);
}
