import { IProduct } from "@/type";

export const hitProducts: IProduct[] = [
	{
		id: 1,
		title: "Soatsiz Alisali Yandex Mini Stansiyasi aqlli karnayi, Kul rang",
		image: [
			"/products/product-1.webp",
			"/products/product-1.2.webp",
			"/products/product-1.3.webp",
			"/products/product-1.4.webp",
		],
		price: 1190000,
		monthlyPrice: 99167,
		monthlyDuration: 18,
		rating: 5,
		reviewsText: "Sharh yo‘q",
		badge: "Xit savdo",
		discount: "50•0•2",
		code: "00013513",
		brand: "Yandex",
		capacity: "Mini",
		availability: "Mavjud",
		shortDescription: "Mahsulot haqida qisqacha",
		storeCount: 12,
		warranty: "1 yil",
		installmentNote:
			"Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli to'lovni tanlashingiz mumkin",
		providers: ["Axiom nasiya", "TBC Nasiya", "Alif", "Anorbank", "Open"],
	},
	{
		id: 2,
		title: "Haier H43K801UG Smart Televizori",
		image: [
			"/products/product-1.webp",
			"/products/product-1.2.webp",
			"/products/product-1.3.webp",
			"/products/product-1.4.webp",
		],
		price: 4800000,
		monthlyPrice: 400000,
		monthlyDuration: 18,
		reviewsText: "Sharh yo‘q",
		badge: "Xit savdo",
		discount: "0•0•12",
		discountSecondary: "50•0•2",
		code: "00024591",
		brand: "Haier",
		capacity: '43"',
		availability: "Mavjud",
		shortDescription: "Mahsulot haqida qisqacha",
		storeCount: 9,
		warranty: "2 yil",
		installmentNote:
			"Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli to'lovni tanlashingiz mumkin",
		providers: ["Axiom nasiya", "TBC Nasiya", "Alif", "Anorbank", "Open"],
	},
	{
		id: 3,
		title: "Alisali Yandex Duo Max Stansiyasi aqlli karnayi, Qora, 60Vt",

		image: [
			"/products/product-1.webp",
			"/products/product-1.2.webp",
			"/products/product-1.3.webp",
			"/products/product-1.4.webp",
		],
		price: 6990000,
		monthlyPrice: 582500,
		monthlyDuration: 18,
		reviewsText: "Sharh yo‘q",
		badge: "Xit savdo",
		discount: "50•0•2",
		code: "00019842",
		brand: "Yandex",
		capacity: "60 Vt",
		availability: "Mavjud",
		shortDescription: "Mahsulot haqida qisqacha",
		storeCount: 7,
		warranty: "1 yil",
		installmentNote:
			"Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli to'lovni tanlashingiz mumkin",
		providers: ["Axiom nasiya", "TBC Nasiya", "Alif", "Anorbank", "Open"],
	},
	{
		id: 4,
		title: "Polaris PUH 4550 WIFI IQ Home Havo namlagichi",
		image: [
			"/products/product-1.webp",
			"/products/product-1.2.webp",
			"/products/product-1.3.webp",
			"/products/product-1.4.webp",
		],
		price: 2199000,
		monthlyPrice: 183250,
		monthlyDuration: 18,
		reviewsText: "Sharh yo‘q",
		badge: "Xit savdo",
		discount: "0•0•12",
		discountSecondary: "50•0•2",
		code: "00038712",
		brand: "Polaris",
		capacity: "4.5 L",
		availability: "Mavjud",
		shortDescription: "Mahsulot haqida qisqacha",
		storeCount: 5,
		warranty: "2 yil",
		installmentNote:
			"Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli to'lovni tanlashingiz mumkin",
		providers: ["Axiom nasiya", "TBC Nasiya", "Alif", "Anorbank", "Open"],
	},
	{
		id: 5,
		title: "Resanta YB-2 Havo namlagichi",
		image: [
			"/products/product-1.webp",
			"/products/product-1.2.webp",
			"/products/product-1.3.webp",
			"/products/product-1.4.webp",
		],
		price: 359000,
		monthlyPrice: 29917,
		monthlyDuration: 18,
		reviewsText: "Sharh yo‘q",
		badge: "Xit savdo",
		discount: "50•0•2",
		code: "00044570",
		brand: "Resanta",
		capacity: "2 L",
		availability: "Mavjud",
		shortDescription: "Mahsulot haqida qisqacha",
		storeCount: 4,
		warranty: "1 yil",
		installmentNote:
			"Buyurtmani rasmiylashtirishda 12 oydan 24 oygacha muddatli to'lovni tanlashingiz mumkin",
		providers: ["Axiom nasiya", "TBC Nasiya", "Alif", "Anorbank", "Open"],
	},
];

export function slugifyProduct(title: string) {
	return title
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function getProductBySlug(slug: string) {
	return hitProducts.find(product => slugifyProduct(product.title) === slug);
}
