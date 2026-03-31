"use client";

import {
	BadgeCheck,
	CalendarDays,
	Loader2,
	MapPin,
	PackageSearch,
	Search,
	Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	useOrder,
	useOrders,
	useUpdateDeliveryStatus,
	useUpdatePaymentStatus,
} from "@/hooks/useOrders";
import { formatPrice } from "@/lib/formatPrice";
import { DeliveryStatus, IOrder, PaymentStatus } from "@/type";

const deliveryStatusOptions: DeliveryStatus[] = [
	"NEW",
	"CONFIRMED",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED",
];

const paymentStatusOptions: PaymentStatus[] = ["PENDING", "PAID", "FAILED"];

function formatDate(value: string) {
	return new Intl.DateTimeFormat("uz-UZ", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

function mapPaymentMethod(value: IOrder["paymentMethod"]) {
	return value === "CARD"
		? "adminOrders.methods.payment.card"
		: "adminOrders.methods.payment.cash";
}

function mapDeliveryMethod(value: IOrder["deliveryMethod"]) {
	return value === "PICKUP"
		? "adminOrders.methods.delivery.pickup"
		: "adminOrders.methods.delivery.courier";
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

function mapPaymentStatus(value: IOrder["paymentStatus"]) {
	switch (value) {
		case "PAID":
			return "adminOrders.status.payment.paid";
		case "FAILED":
			return "adminOrders.status.payment.failed";
		default:
			return "adminOrders.status.payment.pending";
	}
}

function mapDeliveryStatus(value: IOrder["deliveryStatus"]) {
	switch (value) {
		case "CONFIRMED":
			return "adminOrders.status.delivery.confirmed";
		case "SHIPPED":
			return "adminOrders.status.delivery.shipped";
		case "DELIVERED":
			return "adminOrders.status.delivery.delivered";
		case "CANCELLED":
			return "adminOrders.status.delivery.cancelled";
		default:
			return "adminOrders.status.delivery.new";
	}
}

function InfoRow({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex items-start justify-between gap-4 rounded-2xl border bg-muted/20 px-4 py-3'>
			<span className='text-sm text-muted-foreground'>{label}</span>
			{label.toLowerCase() === "phone" ? (
				<a href={`tel:${value}`} className='ml-4 text-sm text-primary'>
					{value}
				</a>
			) : (
				<span className='text-sm font-medium text-foreground'>{value}</span>
			)}
		</div>
	);
}

export default function AdminOrdersPage() {
	const { t } = useTranslation();
	const [search, setSearch] = useState("");
	const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
	const { orders, loading, error } = useOrders();
	const {
		order: selectedOrder,
		loading: detailLoading,
		error: detailError,
	} = useOrder(selectedOrderId, Boolean(selectedOrderId));
	const { updateDeliveryStatus, loading: deliveryUpdating } =
		useUpdateDeliveryStatus();
	const { updatePaymentStatus, loading: paymentUpdating } =
		useUpdatePaymentStatus();

	const filteredOrders = useMemo(() => {
		const q = search.toLowerCase().trim();

		if (!q) {
			return orders;
		}

		return orders.filter(order =>
			[order.name, order.phone].join(" ").toLowerCase().includes(q),
		);
	}, [orders, search]);

	const stats = useMemo(() => {
		return {
			total: orders.length,
			pendingPayment: orders.filter(order => order.paymentStatus === "PENDING")
				.length,
			newOrders: orders.filter(order => order.deliveryStatus === "NEW").length,
			totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
		};
	}, [orders]);

	async function handleDeliveryStatusChange(
		orderId: number,
		status: DeliveryStatus,
	) {
		await updateDeliveryStatus(orderId, status);
	}

	async function handlePaymentStatusChange(
		orderId: number,
		status: PaymentStatus,
	) {
		await updatePaymentStatus(orderId, status);
	}

	return (
		<section className='mx-auto max-w-[90%] px-4 pb-12 pt-8 sm:px-6 lg:px-8'>
			<div className='mb-8 flex flex-col gap-3'>
				<div className='inline-flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm'>
					<PackageSearch className='h-4 w-4' />
					{t("adminOrders.badge")}
				</div>
				<div>
					<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
						{t("adminOrders.title")}
					</h1>
					<p className='mt-2 max-w-3xl text-sm text-muted-foreground md:text-base'>
						{t("adminOrders.description")}
					</p>
				</div>
			</div>

			<div className='mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
				<StatCard
					title={t("adminOrders.stats.totalOrders")}
					value={String(stats.total)}
				/>
				<StatCard
					title={t("adminOrders.stats.newOrders")}
					value={String(stats.newOrders)}
				/>
				<StatCard
					title={t("adminOrders.stats.pendingPayment")}
					value={String(stats.pendingPayment)}
				/>
				<StatCard
					title={t("adminOrders.stats.totalAmount")}
					value={`${formatPrice(stats.totalRevenue)} so&apos;m`}
				/>
			</div>

			<div className='grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]'>
				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader className='gap-4'>
						<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
							<CardTitle className='text-2xl'>
								{t("adminOrders.list.title")}
							</CardTitle>
							<div className='relative w-full lg:max-w-sm'>
								<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									className='pl-9'
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder={t("adminOrders.list.searchPlaceholder")}
								/>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						{loading ? (
							<div className='flex min-h-[320px] items-center justify-center text-muted-foreground'>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								{t("adminOrders.list.loading")}
							</div>
						) : error ? (
							<div className='flex min-h-[320px] items-center justify-center text-center text-destructive'>
								{t("adminOrders.list.error")}
							</div>
						) : (
							<div className='overflow-hidden rounded-2xl border'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.customer")}
											</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.phone")}
											</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.amount")}
											</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.payment")}
											</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.delivery")}
											</TableHead>
											<TableHead>
												{t("adminOrders.list.columns.date")}
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredOrders.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={7}
													className='h-28 text-center text-muted-foreground'
												>
													{t("adminOrders.list.empty")}
												</TableCell>
											</TableRow>
										) : (
											filteredOrders.map(order => (
												<TableRow
													key={order.id}
													className={`cursor-pointer transition ${
														selectedOrderId === order.id ? "bg-muted/50" : ""
													}`}
													onClick={() => setSelectedOrderId(order.id)}
												>
													<TableCell className='font-medium'>
														#{order.id}
													</TableCell>
													<TableCell>{order.name}</TableCell>
													<TableCell>{order.phone}</TableCell>
													<TableCell>
														{formatPrice(order.totalAmount)} so&apos;m
													</TableCell>
													<TableCell>
														<Badge
															variant={paymentBadgeVariant(order.paymentStatus)}
														>
															{t(mapPaymentStatus(order.paymentStatus))}
														</Badge>
													</TableCell>
													<TableCell>
														<Badge
															variant={deliveryBadgeVariant(
																order.deliveryStatus,
															)}
														>
															{t(mapDeliveryStatus(order.deliveryStatus))}
														</Badge>
													</TableCell>
													<TableCell>{formatDate(order.createdAt)}</TableCell>
												</TableRow>
											))
										)}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className='rounded-3xl border shadow-sm xl:sticky xl:top-8 xl:h-fit'>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{t("adminOrders.detail.title")}
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-5'>
						{!selectedOrderId ? (
							<div className='rounded-2xl border border-dashed p-8 text-center text-muted-foreground'>
								{t("adminOrders.detail.placeholder")}
							</div>
						) : detailLoading ? (
							<div className='flex min-h-[280px] items-center justify-center text-muted-foreground'>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								{t("adminOrders.detail.loading")}
							</div>
						) : detailError || !selectedOrder ? (
							<div className='rounded-2xl border border-dashed p-8 text-center text-muted-foreground'>
								{t("adminOrders.detail.error")}
							</div>
						) : (
							<>
								<div className='grid gap-3 sm:grid-cols-2'>
									<InfoRow
										label={t("adminOrders.detail.fields.customer")}
										value={selectedOrder.name}
									/>
									<InfoRow
										label={t("adminOrders.detail.fields.phone")}
										value={selectedOrder.phone}
									/>
									<InfoRow
										label={t("adminOrders.detail.fields.paymentMethod")}
										value={t(mapPaymentMethod(selectedOrder.paymentMethod))}
									/>
									<InfoRow
										label={t("adminOrders.detail.fields.deliveryMethod")}
										value={t(mapDeliveryMethod(selectedOrder.deliveryMethod))}
									/>
									<InfoRow
										label={t("adminOrders.detail.fields.date")}
										value={formatDate(selectedOrder.createdAt)}
									/>
									<InfoRow
										label={t("adminOrders.detail.fields.totalAmount")}
										value={`${formatPrice(selectedOrder.totalAmount)} so&apos;m`}
									/>
								</div>

								<div className='grid gap-4 md:grid-cols-2'>
									<div className='space-y-2'>
										<p className='text-sm text-muted-foreground'>
											{t("adminOrders.detail.paymentStatus")}
										</p>
										<Select
											value={selectedOrder.paymentStatus}
											onValueChange={value =>
												void handlePaymentStatusChange(
													selectedOrder.id,
													value as PaymentStatus,
												)
											}
											disabled={paymentUpdating}
										>
											<SelectTrigger className='h-11 rounded-2xl'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{paymentStatusOptions.map(status => (
													<SelectItem key={status} value={status}>
														{t(mapPaymentStatus(status))}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className='space-y-2'>
										<p className='text-sm text-muted-foreground'>
											{t("adminOrders.detail.deliveryStatus")}
										</p>
										<Select
											value={selectedOrder.deliveryStatus}
											onValueChange={value =>
												void handleDeliveryStatusChange(
													selectedOrder.id,
													value as DeliveryStatus,
												)
											}
											disabled={deliveryUpdating}
										>
											<SelectTrigger className='h-11 rounded-2xl'>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{deliveryStatusOptions.map(status => (
													<SelectItem key={status} value={status}>
														{t(mapDeliveryStatus(status))}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<Card className='rounded-3xl border shadow-sm'>
									<CardHeader>
										<CardTitle className='text-lg'>
											{t("adminOrders.detail.addressTitle")}
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-3'>
										<div className='flex items-start gap-3 rounded-2xl bg-muted/30 p-4'>
											<MapPin className='mt-0.5 h-4 w-4 text-muted-foreground' />
											<div className='space-y-1'>
												<p className='font-medium text-foreground'>
													{selectedOrder.region}, {selectedOrder.district}
												</p>
												<p className='text-sm text-muted-foreground'>
													{selectedOrder.address}
												</p>
											</div>
										</div>
										{selectedOrder.comment ? (
											<div className='rounded-2xl bg-muted/30 p-4 text-sm text-muted-foreground'>
												{selectedOrder.comment}
											</div>
										) : null}
									</CardContent>
								</Card>

								<Card className='rounded-3xl border shadow-sm'>
									<CardHeader>
										<CardTitle className='text-lg'>
											{t("adminOrders.detail.itemsTitle")}
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-3'>
										{selectedOrder.items.map(item => (
											<div
												key={item.id}
												className='rounded-2xl border bg-muted/20 p-4'
											>
												<div className='flex items-start justify-between gap-4'>
													<div>
														<p className='font-medium text-foreground'>
															{item.productTitle}
														</p>
														<p className='mt-1 text-sm text-muted-foreground'>
															{t("adminOrders.detail.quantity")}:{" "}
															{item.quantity}
														</p>
														<p className='text-sm text-muted-foreground'>
															{t("adminOrders.detail.orderTimePrice")}:{" "}
															{formatPrice(item.orderTimePrice)} so&apos;m
														</p>
													</div>
													<p className='font-semibold text-foreground'>
														{formatPrice(item.totalPrice)} so&apos;m
													</p>
												</div>
											</div>
										))}
									</CardContent>
								</Card>

								<Card className='rounded-3xl border shadow-sm'>
									<CardContent className='grid gap-3 p-6 sm:grid-cols-3'>
										<div className='rounded-2xl bg-muted/30 p-4'>
											<div className='mb-2 flex items-center gap-2 text-muted-foreground'>
												<Wallet className='h-4 w-4' />
												{t("adminOrders.detail.subtotal")}
											</div>
											<p className='text-lg font-semibold'>
												{formatPrice(selectedOrder.subtotal)} so&apos;m
											</p>
										</div>
										<div className='rounded-2xl bg-muted/30 p-4'>
											<div className='mb-2 flex items-center gap-2 text-muted-foreground'>
												<BadgeCheck className='h-4 w-4' />
												{t("adminOrders.detail.deliveryFee")}
											</div>
											<p className='text-lg font-semibold'>
												{formatPrice(selectedOrder.deliveryFee)} so&apos;m
											</p>
										</div>
										<div className='rounded-2xl bg-muted/30 p-4'>
											<div className='mb-2 flex items-center gap-2 text-muted-foreground'>
												<CalendarDays className='h-4 w-4' />
												{t("adminOrders.detail.total")}
											</div>
											<p className='text-lg font-semibold'>
												{formatPrice(selectedOrder.totalAmount)} so&apos;m
											</p>
										</div>
									</CardContent>
								</Card>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function StatCard({ title, value }: { title: string; value: string }) {
	return (
		<Card className='rounded-3xl border shadow-sm'>
			<CardContent className='p-6'>
				<p className='text-sm text-muted-foreground'>{title}</p>
				<p className='mt-2 text-2xl font-bold tracking-tight'>{value}</p>
			</CardContent>
		</Card>
	);
}
