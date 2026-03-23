"use client";

import { useState } from "react";
import Link from "next/link";
import {
	ArrowUp,
	CreditCard,
	Facebook,
	Instagram,
	Mail,
	Phone,
	Send,
	X,
	Youtube,
} from "lucide-react";

const companyLinks = [
	{ label: "Yuridik shaxslar uchun", href: "#" },
	{ label: "Biz haqimizda", href: "#" },
	{ label: "Yangiliklar va bloglar", href: "#" },
	{ label: "IMEI ni tekshirish", href: "#" },
	{ label: "Tenool ishlash", href: "#" },
];

const infoLinks = [
	{ label: "Bepul yetkazib berish", href: "#" },
	{ label: "Xizmat ko'rsatish markazlari", href: "#" },
	{ label: "Shaxsiy kabinet", href: "#" },
	{ label: "Aloqa raqamlari", href: "#" },
	{ label: "Ommaviy taklif shartnomasi", href: "#" },
];

const helpLinks = [
	{ label: "Maxsulotni qaytarish", href: "#" },
	{ label: "Mahsulotlar uchun kafolat", href: "#" },
	{ label: "Do'konlar manzillari", href: "#" },
];

const socialLinks = [
	{ label: "Facebook", href: "#", icon: Facebook },
	{ label: "Telegram", href: "#", icon: Send },
	{ label: "Instagram", href: "#", icon: Instagram },
	{ label: "YouTube", href: "#", icon: Youtube },
	{ label: "Email", href: "mailto:info@example.com", icon: Mail },
];

const paymentMethods = ["Uzcard", "Humo", "Payme", "Click"];

const contactActions = [
	{
		label: "Qo'ng'iroq qilmoq",
		href: "tel:+998 33 100 23 10",
		icon: Phone,
		className: "bg-[#28c981] text-white",
	},
	{
		label: "Pochtaga xabar jo'natmoq",
		href: "mailto:info@example.com",
		icon: Mail,
		className: "bg-[#ffc400] text-[#333333]",
	},
	{
		label: "Telegram",
		href: "#",
		icon: Send,
		className: "bg-[#229ed9] text-white",
	},
];

type FooterLinkGroupProps = {
	title: string;
	links: { label: string; href: string }[];
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
	return (
		<div className='space-y-4'>
			<h3 className='text-xl font-semibold text-white'>{title}</h3>
			<div className='space-y-3 text-[17px] leading-6 text-white/90'>
				{links.map(link => (
					<Link
						key={link.label}
						href={link.href}
						className='block transition hover:text-[#ffbf2f]'
					>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
}

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const [isContactCardOpen, setIsContactCardOpen] = useState(false);

	return (
		<footer className='relative mt-24 overflow-hidden bg-[#2f2f2f] text-white'>
			<div className='absolute inset-x-0 top-0 h-px bg-white/10' />

			<div className='mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 lg:px-10'>
				<div className='grid gap-12 xl:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr]'>
					<div className='space-y-7'>
						<div className='space-y-2'>
							<p className='text-sm text-white/80'>
								Savolingiz bormi? Qo&apos;ng&apos;iroq qiling
							</p>
							<Link
								href='tel:+998712099944'
								className='block text-3xl font-semibold tracking-tight transition hover:text-[#ffbf2f]'
							>
								+998 33 100 23 10
							</Link>
						</div>

						<div className='flex flex-wrap gap-3'>
							{socialLinks.map(({ label, href, icon: Icon }) => (
								<Link
									key={label}
									href={href}
									aria-label={label}
									className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/12 text-white/90 transition hover:bg-white/20 hover:text-white'
								>
									<Icon size={22} />
								</Link>
							))}
						</div>
					</div>

					<FooterLinkGroup title='Kompaniya' links={companyLinks} />
					<FooterLinkGroup title="Ma'lumot" links={infoLinks} />
					<FooterLinkGroup title='Haridorga yordam' links={helpLinks} />

					{/* <div className='space-y-5'>
						<h3 className='text-xl font-semibold text-white'>
							Ilovani yuklab olish
						</h3>

						<div className='flex flex-col gap-5 sm:flex-row sm:items-start'>
							<FooterQr />

							<div className='space-y-4'>
								<div className='flex flex-wrap gap-3'>
									{storeLinks.map(({ label, href, icon: Icon }) => (
										<Link
											key={label}
											href={href}
											aria-label={label}
											className='flex h-11 w-12 items-center justify-center rounded-2xl bg-white/12 text-white transition hover:bg-white/20'
										>
											<Icon size={20} />
										</Link>
									))}
								</div>

								<div className='max-w-[180px] space-y-2 text-white/75'>
									<p className='text-base leading-6'>
										Yuklab olish uchun QR-kodni skanerlang
									</p>
									<div className='flex items-center gap-2 text-sm text-white/50'>
										<span className='inline-block h-px w-10 bg-white/20' />
										<span>tezkor o&apos;tish</span>
									</div>
								</div>
							</div>
						</div>
					</div> */}
				</div>

				<div className='mt-12 flex flex-col gap-6 border-t border-white/12 pt-7 lg:flex-row lg:items-end lg:justify-between'>
					<p className='max-w-3xl text-sm leading-6 text-white/65'>
						2016-{currentYear} © texnool.uz. Barcha huquqlar himoyalangan.
						Tovarlarning ko&apos;rsatilgan qiymati va ularni sotib olish
						shartlari joriy sanaga amal qiladi.
					</p>

					<div className='flex flex-wrap gap-3'>
						{paymentMethods.map(method => (
							<div
								key={method}
								className='inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700'
							>
								<CreditCard size={16} className='text-[#0ea5e9]' />
								<span>{method}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='fixed bottom-6 right-6 z-40 flex flex-col gap-4 justify-end'>
				<button
					type='button'
					aria-label='Yuqoriga qaytish'
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className='flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2f2f2f] shadow-lg transition hover:-translate-y-0.5'
				>
					<ArrowUp size={22} />
				</button>

				{isContactCardOpen ? (
					<div className='flex flex-col items-end gap-3'>
						<div className='w-[278px] rounded-[22px] bg-white p-4 text-[#2f2f2f] shadow-[0_20px_50px_rgba(0,0,0,0.3)]'>
							<div className='space-y-4'>
								{contactActions.map(
									({ label, href, icon: Icon, className }) => (
										<Link
											key={label}
											href={href}
											className='flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-100'
										>
											<span
												className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${className}`}
											>
												<Icon size={20} />
											</span>
											<span className='max-w-[160px] text-[15px] font-medium leading-5'>
												{label}
											</span>
										</Link>
									),
								)}
							</div>
						</div>

						<button
							type='button'
							aria-label='Kontakt panelini yopish'
							onClick={() => setIsContactCardOpen(false)}
							className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ffc400] bg-white text-black shadow-lg transition hover:-translate-y-0.5'
						>
							<X size={22} />
						</button>
					</div>
				) : (
					<button
						type='button'
						aria-label='Kontakt panelini ochish'
						onClick={() => setIsContactCardOpen(true)}
						className='flex h-12 w-12 items-center justify-center rounded-full bg-[#ffc400] text-black shadow-lg transition hover:-translate-y-0.5'
					>
						<Phone size={22} />
					</button>
				)}
			</div>
		</footer>
	);
}
