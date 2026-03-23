import type { ComponentType } from "react";
import Link from "next/link";
import {
	AirVent,
	BadgeHelp,
	Blend,
	Cable,
	ChefHat,
	Gamepad2,
	Headphones,
	HousePlus,
	Laptop,
	MonitorSpeaker,
	Shirt,
	Smartphone,
	Sparkles,
	Tv,
	WashingMachine,
} from "lucide-react";

type CatalogCategory = {
	id: number;
	title: string;
	href: string;
	icon: ComponentType<{ className?: string }>;
	accent: string;
	items: string[];
};

const catalogCategories: CatalogCategory[] = [
	{
		id: 1,
		title: "Smartfonlar va gadjetlar",
		href: "#",
		icon: Smartphone,
		accent: "from-slate-100 via-violet-50 to-amber-50",
		items: [
			"Smartfonlar",
			"Telefonlar",
			"Planshetlar",
			"Gadjetlar",
			"Telefon aksessuarlari",
		],
	},
	{
		id: 2,
		title: "Kompyuter texnikasi",
		href: "#",
		icon: Laptop,
		accent: "from-slate-100 via-cyan-50 to-slate-50",
		items: [
			"Noutbuklar",
			"Monitorlar",
			"Monobloklar",
			"Kompyuter aksessuarlari",
			"Tashqi qattiq disklar",
			"Flesh xotiralar",
			"Kompyuter uchun kolonka",
			"Rele va stabilizatorlar",
		],
	},
	{
		id: 3,
		title: "Televizorlar va audiotexnikalar",
		href: "#",
		icon: Tv,
		accent: "from-slate-100 via-fuchsia-50 to-yellow-50",
		items: [
			"Televizorlar",
			"Televizor aksessuarlari",
			"Yandex stansiyasi",
			"Musiqiy markazlar",
			"Simsiz kolonkalar",
			"Soundbarlar",
			"TV va kinoga obuna",
			"Bolalar uchun aqlli karnaylar",
		],
	},
	{
		id: 4,
		title: "Iqlim texnikasi",
		href: "#",
		icon: AirVent,
		accent: "from-slate-100 via-emerald-50 to-sky-50",
		items: [
			"Konditsionerlar",
			"Ventilyatorlar",
			"Isitgichlar",
			"Suv isitgichlar",
			"Namlagichlar",
			"Havo tozalagichlar",
		],
	},
	{
		id: 5,
		title: "Maishiy texnika",
		href: "#",
		icon: WashingMachine,
		accent: "from-slate-100 via-rose-50 to-orange-50",
		items: [
			"Uy parvarishi tovarlari",
			"Kiyim parvarishi mahsulotlari",
			"Dispenserlar",
		],
	},
	{
		id: 6,
		title: "Oshxona uchun texnika",
		href: "#",
		icon: ChefHat,
		accent: "from-slate-100 via-yellow-50 to-orange-50",
		items: [
			"Mikserlar",
			"Blenderlar",
			"Choynaklar",
			"Kofe mashinalari",
			"Mikroto'lqinli pechlar",
			"Multivarkalar",
		],
	},
	{
		id: 7,
		title: "Go'zallik va parvarish",
		href: "#",
		icon: Sparkles,
		accent: "from-slate-100 via-pink-50 to-rose-50",
		items: [
			"Soch quritgichlar",
			"Stailerlar",
			"Trimmerlar",
			"Elektr ustara",
			"Massaj qurilmalari",
		],
	},
	{
		id: 8,
		title: "Audio va gaming",
		href: "#",
		icon: Gamepad2,
		accent: "from-slate-100 via-indigo-50 to-blue-50",
		items: [
			"Quloqchinlar",
			"O'yin pristavkalari",
			"Gaming aksessuarlari",
			"Joystiklar",
			"VR qurilmalar",
		],
	},
	{
		id: 9,
		title: "Ofis va biznes uchun",
		href: "#",
		icon: MonitorSpeaker,
		accent: "from-slate-100 via-zinc-50 to-cyan-50",
		items: [
			"Printerlar",
			"Skanerlar",
			"Laminatorlar",
			"Projektorlar",
			"Ofis mebellari",
		],
	},
	{
		id: 10,
		title: "Uy uchun qulayliklar",
		href: "#",
		icon: HousePlus,
		accent: "from-slate-100 via-lime-50 to-amber-50",
		items: [
			"Aqlli uy qurilmalari",
			"Xavfsizlik tizimlari",
			"Yoritish vositalari",
			"Uy aksessuarlari",
		],
	},
	{
		id: 11,
		title: "Kabellar va aksessuarlar",
		href: "#",
		icon: Cable,
		accent: "from-slate-100 via-blue-50 to-violet-50",
		items: [
			"Zaryadlovchilar",
			"Kabellar",
			"Adapterlar",
			"Powerbanklar",
			"Holderlar",
		],
	},
	{
		id: 12,
		title: "Kiyim va lifestyle",
		href: "#",
		icon: Shirt,
		accent: "from-slate-100 via-neutral-50 to-stone-50",
		items: [
			"Smart kiyimlar",
			"Sport aksessuarlari",
			"Sumkalar",
			"Sayohat uchun buyumlar",
		],
	},
];

export default function CatalogPage() {
	return (
		<section className='mx-auto max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 lg:px-10'>
			<div className='mb-10 flex flex-col gap-3 border-b border-border pb-6'>
				<h1 className='text-3xl font-semibold tracking-tight text-foreground md:text-5xl'>
					Mahsulotlar katalogi Toshkentda
				</h1>
				<p className='max-w-3xl text-base leading-7 text-muted-foreground md:text-lg'>
					Barcha bo&apos;limlar hozircha mock data orqali chiqyapti. Keyinchalik
					siz shu strukturani backenddan keladigan kategoriya va subkategoriya
					ma&apos;lumotlari bilan to&apos;ldirishingiz mumkin.
				</p>
			</div>

			<div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5'>
				{catalogCategories.map(category => {
					const Icon = category.icon;

					return (
						<Link
							key={category.id}
							href={category.href}
							className='group rounded-[28px] border border-border/70 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]'
						>
							<div
								className={`mb-5 flex h-28 items-center rounded-[22px] bg-gradient-to-br ${category.accent} px-5`}
							>
								<div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 shadow-sm backdrop-blur'>
									<Icon className='h-8 w-8 text-slate-700' />
								</div>
								<div className='ml-4 flex items-center gap-2 text-slate-400'>
									<Blend className='h-4 w-4' />
									<Headphones className='h-5 w-5' />
									<BadgeHelp className='h-4 w-4' />
								</div>
							</div>

							<h2 className='mb-4 text-[26px] font-semibold leading-8 text-foreground'>
								{category.title}
							</h2>

							<div className='space-y-3'>
								{category.items.map(item => (
									<div
										key={item}
										className='text-[17px] leading-7 text-foreground/85 transition group-hover:text-foreground'
									>
										{item}
									</div>
								))}
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
