"use client";

import ProductSection from "@/components/sections/Products";
import { hitProducts, slugifyProduct } from "@/mockInfo/data";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const mockData = [
	{
		id: 1,
		title: "Smartfonlar va gadjetlar",
		titleKey: "catalogSection.categories.smartphones",
		image: "/catalog/1.webp",
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
		titleKey: "catalogSection.categories.computers",
		image: "/catalog/2.webp",
		items: [
			"Noutbuklar",
			"Monitorlar",
			"Monobloklar",
			"Kompyuter aksessuarlari",
			"Tashqi qattiq disklar",
			"Flash xotiralar",
			"Kolonkalar",
			"Stabilizatorlar",
		],
	},
	{
		id: 3,
		title: " Televizorlar va audiotexnikalar ",
		titleKey: "catalogSection.categories.tvAudio",
		image: "/catalog/3.webp",
		items: [
			"Noutbuklar",
			"Monitorlar",
			"Monobloklar",
			"Kompyuter aksessuarlari",
			"Tashqi qattiq disklar",
			"Flash xotiralar",
			"Kolonkalar",
			"Stabilizatorlar",
		],
	},
	{
		id: 4,
		title: "Iqlim texnikasi ",
		titleKey: "catalogSection.categories.climate",
		image: "/catalog/4.webp",
		items: [
			"Noutbuklar",
			"Monitorlar",
			"Monobloklar",
			"Kompyuter aksessuarlari",
			"Tashqi qattiq disklar",
			"Flash xotiralar",
			"Kolonkalar",
			"Stabilizatorlar",
		],
	},
	{
		id: 5,
		title: "Maishiy texnika ",
		titleKey: "catalogSection.categories.homeAppliances",
		image: "/catalog/5.webp",
		items: [
			"Televizorlar",
			"TV aksessuarlari",
			"Musiqiy markazlar",
			"Simsiz kolonkalar",
			"Soundbarlar",
			"TV obuna",
		],
	},

	{
		id: 6,
		title: "Maishiy texnika ",
		titleKey: "catalogSection.categories.household",
		image: "/catalog/6.webp",
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
		id: 7,
		title: "Oshxona uchun texnika ",
		titleKey: "catalogSection.categories.kitchen",
		image: "/catalog/7.webp",
		items: [
			"Uy parvarishi tovarlari",
			"Kiyim parvarishi mahsulotlari",
			"Dispenserlar",
		],
	},
];

const catalogItemLabelKeys: Record<string, string> = {
	Smartfonlar: "catalogPage.items.smartphones",
	Telefonlar: "catalogPage.items.phones",
	Planshetlar: "catalogPage.items.tablets",
	Gadjetlar: "catalogPage.items.gadgets",
	"Telefon aksessuarlari": "catalogPage.items.phoneAccessories",
	Noutbuklar: "catalogPage.items.laptops",
	Monitorlar: "catalogPage.items.monitors",
	Monobloklar: "catalogPage.items.monoblocks",
	"Kompyuter aksessuarlari": "catalogPage.items.computerAccessories",
	"Tashqi qattiq disklar": "catalogPage.items.externalDrives",
	"Flash xotiralar": "catalogPage.items.flashStorage",
	Kolonkalar: "catalogPage.items.speakers",
	Stabilizatorlar: "catalogPage.items.stabilizers",
	Televizorlar: "catalogPage.items.tvs",
	"TV aksessuarlari": "catalogPage.items.tvAccessories",
	"Musiqiy markazlar": "catalogPage.items.musicCenters",
	"Simsiz kolonkalar": "catalogPage.items.wirelessSpeakers",
	Soundbarlar: "catalogPage.items.soundbars",
	"TV obuna": "catalogPage.items.tvSubscription",
	Konditsionerlar: "catalogPage.items.airConditioners",
	Ventilyatorlar: "catalogPage.items.fans",
	Isitgichlar: "catalogPage.items.heaters",
	"Suv isitgichlar": "catalogPage.items.waterHeaters",
	Namlagichlar: "catalogPage.items.humidifiers",
	"Havo tozalagichlar": "catalogPage.items.airPurifiers",
	"Uy parvarishi tovarlari": "catalogPage.items.homeCare",
	"Kiyim parvarishi mahsulotlari": "catalogPage.items.clothingCare",
	Dispenserlar: "catalogPage.items.dispensers",
};

export default function CatalogPage() {
	const { t } = useTranslation();

	return (
		<section className='py-40'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
					{mockData.map(item => (
						<div
							key={item.id}
							// className='group rounded-2xl bg-secondary/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
							className='group cursor-pointer  p-4 group-hover:shadow rounded-2xl border border-border/70 dark:bg-secondary/30'
						>
							<Link href={`/catalog/${slugifyProduct(item.items[0])}`}>
								<div className='mb-5 flex h-[80px] items-start'>
									<Image
										src={item.image}
										alt={t(item.titleKey)}
										width={90}
										height={90}
										className='h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-105'
									/>
								</div>

								<h3 className='mb-5 text-[28px] font-semibold leading-[1.2] text-[#1f1f1f] transition-colors duration-200 hover:text-primary'>
									{t(item.titleKey)}
								</h3>
							</Link>

							<div className='space-y-3'>
								{item.items.map((subItem, index) => (
									<Link
										key={index}
										href={`/catalog/${slugifyProduct(subItem)}`}
										className='cursor-pointer text-sm leading-[1.4] text-[#2b2b2b] flex flex-wrap transition-colors duration-200 hover:text-primary'
									>
										{t(catalogItemLabelKeys[subItem] ?? subItem)}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				<ProductSection products={hitProducts} viewAllHref='/products' />
			</div>
		</section>
	);
}
