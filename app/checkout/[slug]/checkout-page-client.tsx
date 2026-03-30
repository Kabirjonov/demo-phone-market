"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
	ArrowLeft,
	BadgePercent,
	Bike,
	Building2,
	Check,
	ChevronRight,
	CircleDollarSign,
	CreditCard,
	MapPin,
	Package,
	Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { regionOptions } from "@/const/location";
import { useProduct } from "@/hooks/useProducts";
import { resolveProductImage } from "@/lib/resolveProductImage";
import { useSessionStore } from "@/store/useSession.store";

const paymentMethods = [
	{ id: "payme", labelKey: "payme", icon: Wallet },
	{ id: "click", labelKey: "click", icon: CircleDollarSign },
	{ id: "card", labelKey: "card", icon: CreditCard },
	{ id: "cash", labelKey: "cash", icon: Package },
	{ id: "corp", labelKey: "corp", icon: Building2 },
	{ id: "installment", labelKey: "installment", icon: BadgePercent },
] as const;

const STORE_MAP_EMBED_URL =
	"https://yandex.com/map-widget/v1/?ll=69.273777%2C41.321114&mode=whatshere&whatshere%5Bpoint%5D=69.273777%2C41.321114&whatshere%5Bzoom%5D=17&z=17";

type DeliveryMethod = "delivery" | "pickup";
type ShippingSpeed = "standard" | "express";

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

function splitUserName(name?: string | null) {
	if (!name) {
		return { firstName: "", lastName: "" };
	}

	const parts = name.trim().split(/\s+/);
	return {
		firstName: parts[0] ?? "",
		lastName: parts.slice(1).join(" "),
	};
}

function SectionNumber({ value }: { value: number }) {
	return (
		<div className='flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-white'>
			{value}
		</div>
	);
}

function OptionCard({
	active,
	onClick,
	title,
	description,
	icon: Icon,
}: {
	active: boolean;
	onClick: () => void;
	title: string;
	description?: string;
	icon?: typeof CreditCard;
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`relative flex min-h-20 w-full items-center justify-between rounded-[22px] border px-5 py-4 text-left transition ${
				active
					? "border-primary/60 bg-primary/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
					: "border-border bg-white hover:border-primary/30"
			}`}
		>
			<div className='space-y-1'>
				<div className='flex items-center gap-3 text-base font-semibold text-foreground'>
					{Icon ? <Icon className='h-5 w-5 text-muted-foreground' /> : null}
					<span>{title}</span>
				</div>
				{description ? (
					<p className='text-sm text-muted-foreground'>{description}</p>
				) : null}
			</div>

			<div
				className={`flex h-7 w-7 items-center justify-center rounded-full border ${
					active
						? "border-primary bg-primary text-primary-foreground"
						: "border-slate-200 bg-slate-100 text-transparent"
				}`}
			>
				<Check className='h-4 w-4' />
			</div>
		</button>
	);
}

export default function CheckoutPageClient({ slug }: { slug: string }) {
	const { t } = useTranslation();
	const { product, loading, error } = useProduct(slug);
	const user = useSessionStore(state => state.user);

	const initialName = useMemo(() => splitUserName(user?.name), [user?.name]);
	const [phone, setPhone] = useState(user?.phone ?? "+998");
	const [firstName, setFirstName] = useState(initialName.firstName);
	const [lastName, setLastName] = useState(initialName.lastName);
	const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
	const [region, setRegion] = useState<keyof typeof regionOptions>("Toshkent shahri");
	const [district, setDistrict] = useState<string>(regionOptions["Toshkent shahri"][0]);
	const [address, setAddress] = useState("");
	const [floor, setFloor] = useState("");
	const [shippingSpeed, setShippingSpeed] = useState<ShippingSpeed>("standard");
	const [paymentMethod, setPaymentMethod] = useState<(typeof paymentMethods)[number]["id"]>("payme");
	const [promoCode, setPromoCode] = useState("");
	const [comment, setComment] = useState("");

	useEffect(() => {
		setPhone(user?.phone ?? "+998");
		const nextName = splitUserName(user?.name);
		setFirstName(nextName.firstName);
		setLastName(nextName.lastName);
	}, [user?.name, user?.phone]);

	useEffect(() => {
		setDistrict(regionOptions[region][0]);
	}, [region]);

	const deliveryPrice =
		deliveryMethod === "pickup" ? 0 : shippingSpeed === "express" ? 35000 : 0;
	const totalPrice = (product?.price ?? 0) + deliveryPrice;
	const productImage = resolveProductImage(product?.images?.[0]);

	function handleSubmit() {
		if (!product) return;

		if (!phone.trim() || !firstName.trim() || !lastName.trim()) {
			toast.error(t("checkout.validation.userInfo"));
			return;
		}

		if (deliveryMethod === "delivery" && !address.trim()) {
			toast.error(t("checkout.validation.address"));
			return;
		}

		toast.success(
			t("checkout.validation.success", {
				product: product.title,
			}),
		);
	}

	if (loading) {
		return (
			<div className='mx-auto max-w-[1320px] px-4 pb-16 pt-28 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]'>
					<div className='space-y-6'>
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className='h-28 animate-pulse rounded-[28px] bg-muted/60'
							/>
						))}
					</div>
					<div className='h-80 animate-pulse rounded-[28px] bg-muted/60' />
				</div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className='mx-auto max-w-[960px] px-4 pb-16 pt-28 text-center sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-semibold text-foreground'>
					{t("checkout.page.notFoundTitle")}
				</h1>
				<p className='mt-4 text-muted-foreground'>
					{t("checkout.page.notFoundDescription")}
				</p>
				<Link
					href='/product'
					className='mt-6 inline-block text-primary hover:underline'
				>
					{t("checkout.page.backToProducts")}
				</Link>
			</div>
		);
	}

	return (
		<div className='mx-auto max-w-[1320px] px-4 pb-16 pt-28 sm:px-6 lg:px-8'>
			<div className='flex flex-wrap items-center gap-3'>
				<Link
					href='/'
					className='rounded-xl bg-muted px-4 py-2 text-sm text-foreground transition hover:bg-muted/80'
				>
					{t("checkout.page.home")}
				</Link>
				<Link
					href={`/product/detail/${product.slug ?? product.id}`}
					className='inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm text-foreground transition hover:bg-primary/15'
				>
					<ArrowLeft className='h-4 w-4' />
					{t("checkout.page.back")}
				</Link>
			</div>

			<h1 className='mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl'>
				{t("checkout.page.title")}
			</h1>

			<div className='mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]'>
				<div className='space-y-10'>
					<section className='space-y-5'>
						<div className='flex items-center gap-4'>
							<SectionNumber value={1} />
							<h2 className='text-2xl font-semibold text-foreground'>
								{t("checkout.sections.customerInfo")}
							</h2>
						</div>

						<div className='grid gap-4'>
							<div className='space-y-2'>
								<label className='text-sm text-muted-foreground'>
									{t("checkout.fields.phone")} *
								</label>
								<Input
									value={phone}
									onChange={e => setPhone(e.target.value)}
									className='h-14 rounded-2xl'
								/>
							</div>
							<div className='grid gap-4 md:grid-cols-2'>
								<div className='space-y-2'>
									<label className='text-sm text-muted-foreground'>
										{t("checkout.fields.firstName")} *
									</label>
									<Input
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
										className='h-14 rounded-2xl'
									/>
								</div>
								<div className='space-y-2'>
									<label className='text-sm text-muted-foreground'>
										{t("checkout.fields.lastName")} *
									</label>
									<Input
										value={lastName}
										onChange={e => setLastName(e.target.value)}
										className='h-14 rounded-2xl'
									/>
								</div>
							</div>
						</div>
					</section>

					<section className='space-y-5'>
						<div className='flex items-center gap-4'>
							<SectionNumber value={2} />
							<h2 className='text-2xl font-semibold text-foreground'>
								{t("checkout.sections.receiveMethod")}
							</h2>
						</div>

						<div className='grid gap-4 md:grid-cols-2'>
							<OptionCard
								active={deliveryMethod === "delivery"}
								onClick={() => setDeliveryMethod("delivery")}
								title={t("checkout.delivery.delivery")}
								icon={Bike}
							/>
							<OptionCard
								active={deliveryMethod === "pickup"}
								onClick={() => setDeliveryMethod("pickup")}
								title={t("checkout.delivery.pickup")}
								icon={MapPin}
							/>
						</div>

						{deliveryMethod === "delivery" ? (
							<div className='space-y-5'>
								<h3 className='text-2xl font-semibold text-foreground'>
									{t("checkout.delivery.addressTitle")}
								</h3>
								<div className='grid gap-4 md:grid-cols-2'>
									<div className='space-y-2'>
										<label className='text-sm text-muted-foreground'>
											{t("checkout.fields.region")} *
										</label>
										<Select
											value={region}
											onValueChange={value =>
												setRegion(value as keyof typeof regionOptions)
											}
										>
											<SelectTrigger className='h-14 w-full rounded-2xl px-4'>
												<SelectValue placeholder={t("checkout.fields.select")} />
											</SelectTrigger>
											<SelectContent>
												{Object.keys(regionOptions).map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className='space-y-2'>
										<label className='text-sm text-muted-foreground'>
											{t("checkout.fields.cityDistrict")} *
										</label>
										<Select value={district} onValueChange={setDistrict}>
											<SelectTrigger className='h-14 w-full rounded-2xl px-4'>
												<SelectValue placeholder={t("checkout.fields.select")} />
											</SelectTrigger>
											<SelectContent>
												{regionOptions[region].map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className='grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]'>
									<div className='space-y-2'>
										<label className='text-sm text-muted-foreground'>
											{t("checkout.fields.address")} *
										</label>
										<Input
											value={address}
											onChange={e => setAddress(e.target.value)}
											placeholder={t("checkout.placeholders.address")}
											className='h-14 rounded-2xl'
										/>
									</div>
									<div className='space-y-2'>
										<label className='text-sm text-muted-foreground'>
											{t("checkout.fields.floor")}
										</label>
										<Input
											value={floor}
											onChange={e => setFloor(e.target.value)}
											placeholder={t("checkout.placeholders.floor")}
											className='h-14 rounded-2xl'
										/>
									</div>
								</div>

								<div className='space-y-4'>
									<h3 className='text-2xl font-semibold text-foreground'>
										{t("checkout.delivery.conditionsTitle")}
									</h3>
									<div className='grid gap-4 md:grid-cols-2'>
										<OptionCard
											active={shippingSpeed === "standard"}
											onClick={() => setShippingSpeed("standard")}
											title={t("checkout.delivery.standard")}
											description={t("checkout.values.free")}
										/>
										<OptionCard
											active={shippingSpeed === "express"}
											onClick={() => setShippingSpeed("express")}
											title={t("checkout.delivery.express")}
											description={t("checkout.values.paid")}
										/>
									</div>
								</div>
							</div>
						) : (
							<div className='space-y-4'>
								<div className='rounded-[28px] border border-border bg-white p-5 text-muted-foreground shadow-sm'>
									{t("checkout.pickup.description")}
								</div>

								<div className='overflow-hidden rounded-[28px] border border-border bg-white shadow-sm'>
									<div className='border-b border-border px-5 py-4'>
										<h3 className='text-xl font-semibold text-foreground'>
											{t("checkout.pickup.mapTitle")}
										</h3>
										<p className='mt-1 text-sm text-muted-foreground'>
											{t("checkout.pickup.mapDescription")}
										</p>
									</div>
									<iframe
										title='Texnool store map'
										src={STORE_MAP_EMBED_URL}
										className='h-[360px] w-full border-0'
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
									/>
								</div>
							</div>
						)}
					</section>

					{deliveryMethod === "delivery" ? (
						<section className='space-y-5'>
							<div className='flex items-center gap-4'>
								<SectionNumber value={3} />
								<h2 className='text-2xl font-semibold text-foreground'>
									{t("checkout.sections.paymentMethod")}
								</h2>
							</div>

							<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
								{paymentMethods.map(method => (
									<OptionCard
										key={method.id}
										active={paymentMethod === method.id}
										onClick={() => setPaymentMethod(method.id)}
										title={t(
											`checkout.paymentMethods.${method.labelKey}`,
										)}
										icon={method.icon}
									/>
								))}
							</div>

							<div className='space-y-2'>
								<label className='text-sm text-muted-foreground'>
									{t("checkout.fields.comment")}
								</label>
								<Textarea
									value={comment}
									onChange={e => setComment(e.target.value)}
									placeholder={t("checkout.placeholders.comment")}
									className='min-h-24 rounded-2xl px-4 py-3'
								/>
							</div>

							<Button
								onClick={handleSubmit}
								className='h-14 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground hover:bg-primary/90'
							>
								{t("checkout.actions.submit")}
							</Button>
							<p className='text-sm text-muted-foreground'>
								{t("checkout.actions.agreementPrefix")} {" "}
								<span className='text-primary'>
									{t("checkout.actions.agreementLink")}
								</span>{" "}
								{t("checkout.actions.agreementSuffix")}
							</p>
						</section>
					) : (
						<section className='space-y-5'>
							<Button
								onClick={handleSubmit}
								className='h-14 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground hover:bg-primary/90'
							>
								{t("checkout.actions.submit")}
							</Button>
							<p className='text-sm text-muted-foreground'>
								{t("checkout.actions.agreementPrefix")} {" "}
								<span className='text-primary'>
									{t("checkout.actions.agreementLink")}
								</span>{" "}
								{t("checkout.actions.agreementSuffix")}
							</p>
						</section>
					)}
				</div>

				<aside className='space-y-5 lg:sticky lg:top-28 lg:h-fit'>
					<div className='rounded-[28px] border border-border bg-white p-5 shadow-sm'>
						<div className='flex items-center justify-between gap-3'>
							<h3 className='text-2xl font-semibold text-foreground'>
								{t("checkout.summary.productsTitle")}
							</h3>
							<Link
								href={`/product/detail/${product.slug ?? product.id}`}
								className='rounded-xl bg-muted px-4 py-2 text-sm hover:bg-muted/80'
							>
								{t("checkout.summary.change")}
							</Link>
						</div>
						<div className='mt-5 flex items-center gap-4'>
							<div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-muted/40 p-3'>
								<img
									src={productImage}
									alt={product.title}
									className='h-full w-full object-contain'
								/>
							</div>
							<div className='min-w-0 flex-1'>
								<p className='line-clamp-2 text-base text-foreground'>
									{product.title}
								</p>
								<p className='mt-1 text-2xl font-semibold text-foreground'>
									{formatPrice(product.price)} so&apos;m
								</p>
							</div>
							<div className='text-sm text-muted-foreground'>
								{t("checkout.summary.oneItem")}
							</div>
						</div>
					</div>

					<div className='rounded-[28px] border border-border bg-white p-5 shadow-sm'>
						<h3 className='text-2xl font-semibold text-foreground'>
							{t("checkout.summary.orderTitle")}
						</h3>
						<div className='mt-6 space-y-4 text-base'>
							<div className='flex items-center justify-between gap-4'>
								<span className='text-muted-foreground'>
									{t("checkout.summary.singlePrice")}
								</span>
								<span className='font-semibold text-foreground'>
									{formatPrice(product.price)} so&apos;m
								</span>
							</div>
							<div className='flex items-center justify-between gap-4'>
								<span className='text-muted-foreground'>
									{t("checkout.summary.delivery")}
								</span>
								<span className='font-semibold text-foreground'>
									{deliveryPrice === 0
										? t("checkout.values.free")
										: `${formatPrice(deliveryPrice)} so'm`}
								</span>
							</div>
						</div>
						<div className='my-6 h-px bg-border' />
						<div className='flex items-center justify-between gap-4'>
							<span className='text-2xl font-semibold text-foreground'>
								{t("checkout.summary.total")}
							</span>
							<span className='text-3xl font-bold text-foreground'>
								{formatPrice(totalPrice)} so&apos;m
							</span>
						</div>
					</div>

					<div className='rounded-[22px] border border-border bg-white p-3 shadow-sm'>
						<div className='flex items-center gap-3 rounded-2xl px-3 py-2'>
							<BadgePercent className='h-5 w-5 text-muted-foreground' />
							<Input
								value={promoCode}
								onChange={e => setPromoCode(e.target.value)}
								placeholder={t("checkout.fields.promoCode")}
								className='h-10 border-0 px-0 shadow-none focus-visible:ring-0'
							/>
							<Button size='icon' variant='ghost' className='rounded-full'>
								<ChevronRight className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
