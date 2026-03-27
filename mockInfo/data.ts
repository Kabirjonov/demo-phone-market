import { PromotionItem } from "@/type";

export type IProductSpecification = {
	label: string;
	value: string;
	group?: string;
};

export interface IUser {
	id: string;
	name: string;
	phone: string;
	role: string;
	isVerified: boolean;
}

export type ICategory = {
	id: number;
	name: string;
	slug: string;
	products: IProduct[];
};

export interface IProduct {
	id: number;
	title: string;
	price: number;
	images: string[];
	slug?: string;
	brand: string;
	category?: ICategory;
	stock: number;
	code: string;
	description: string;
	shortDescription?: string;
	specifications?: IProductSpecification[];

	monthlyPrice: number;
	monthlyDuration: number;
	rating?: number;
	reviewsText?: string;
	badge?: string;
	discount?: string;
	discountSecondary?: string;
	capacity?: string;
	storeCount?: number;
	warranty?: string;
	installmentNote?: string;
	providers?: string[];
	availability: boolean;
	user: IUser;
}

export interface IProductFormState {
	title: string;
	price: string;
	brand: string;
	categoryId: string;
	code: string;
	stock: string;
	shortDescription: string;
	description: string;
	imagesText: string;
	specifications: IProductSpecification[];
}

const mockUser: IUser = {
	id: "user-1",
	name: "Texno Admin",
	phone: "+998901234567",
	role: "seller",
	isVerified: true,
};

const smartphoneCategory: ICategory = {
	id: 1,
	name: "Smartfonlar",
	slug: "smartfonlar",
	products: [],
};

export function slugifyProduct(title: string) {
	return title
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export const hitProducts: IProduct[] = [
	{
		id: 1,
		title: "Honor X7d 6/128GB",
		slug: "honor-x7d-6-128gb",
		price: 3400000,
		images: [
			"/products/product-1.webp",
			"/products/product-1.4.webp",
			"/products/product-1.3.webp",
			"/products/product-1.2.webp",
		],
		brand: "Honor",
		category: smartphoneCategory,
		stock: 12,
		availability: true,
		code: "HONOR-X7D-6128",
		shortDescription:
			"Katta batareya va kundalik foydalanish uchun qulay smartfon.",
		description:
			"Honor X7d kundalik foydalanish uchun qulay smartfon. 6500 mAh batareya va bir nechta xotira variantlari bilan keladi.",
		monthlyPrice: 396000,
		monthlyDuration: 12,
		rating: 4.7,
		reviewsText: "Yangi",
		badge: "Hit",
		storeCount: 8,
		warranty: "12 oy",
		installmentNote: "0-0-12 asosida bo‘lib to‘lash мумкин",
		providers: ["Payme Nasiya", "Uzum Nasiya"],
		specifications: [
			{ label: "Xotira", value: "6/128GB", group: "Asosiy xususiyatlar" },
			{ label: "Batareya", value: "6500 mAh", group: "Asosiy xususiyatlar" },
			{ label: "Holati", value: "Yangi", group: "Asosiy xususiyatlar" },
			{
				label: "Rang",
				value: "Qora, Kumush, Yashil",
				group: "Asosiy xususiyatlar",
			},
		],
		user: mockUser,
	},
	{
		id: 2,
		title: "Honor X7d 8/256GB",
		slug: "honor-x7d-8-256gb",
		price: 3890000,
		images: [
			"/products/product-1.webp",
			"/products/product-1.4.webp",
			"/products/product-1.3.webp",
			"/products/product-1.2.webp",
		],
		brand: "Honor",
		category: smartphoneCategory,
		stock: 9,
		availability: true,
		code: "HONOR-X7D-8256",
		shortDescription: "Kengroq xotirali Honor X7d versiyasi.",
		description:
			"Honor X7d 8/256GB kundalik va faol foydalanish uchun mo‘ljallangan. Katta batareya va yaxshi xotira hajmiga ega.",
		monthlyPrice: 454000,
		monthlyDuration: 12,
		rating: 4.8,
		reviewsText: "Mashhur",
		badge: "Top",
		storeCount: 6,
		warranty: "12 oy",
		installmentNote: "12 oyga bo‘lib to‘lash mumkin",
		providers: ["Payme Nasiya", "Alif Nasiya"],
		specifications: [
			{ label: "Xotira", value: "8/256GB", group: "Asosiy xususiyatlar" },
			{ label: "Batareya", value: "6500 mAh", group: "Asosiy xususiyatlar" },
			{ label: "Holati", value: "Yangi", group: "Asosiy xususiyatlar" },
			{ label: "Rang", value: "Qora, Kumush", group: "Asosiy xususiyatlar" },
		],
		user: mockUser,
	},
	{
		id: 3,
		title: "Samsung Galaxy A56",
		slug: "samsung-galaxy-a56",
		price: 5499000,
		images: ["/products/galaxy-a56.webp", "/products/galaxy-a56-2.webp"],
		brand: "Samsung",
		category: smartphoneCategory,
		stock: 15,
		availability: true,
		code: "SAMSUNG-A56",
		shortDescription: "AMOLED ekran va kuchli kamera bilan zamonaviy smartfon.",
		description:
			"Samsung Galaxy A56 kundalik foydalanish, ijtimoiy tarmoqlar va foto uchun qulay smartfon.",
		monthlyPrice: 641000,
		monthlyDuration: 12,
		rating: 4.9,
		reviewsText: "Top savdo",
		badge: "New",
		discount: "-8%",
		storeCount: 10,
		warranty: "12 oy",
		providers: ["Uzum Nasiya", "Alif Nasiya"],
		specifications: [
			{ label: "Xotira", value: "8/256GB", group: "Asosiy xususiyatlar" },
			{ label: "Ekran", value: "6.6 AMOLED", group: "Asosiy xususiyatlar" },
			{ label: "Kamera", value: "50 MP", group: "Asosiy xususiyatlar" },
			{ label: "Batareya", value: "5000 mAh", group: "Asosiy xususiyatlar" },
		],
		user: mockUser,
	},
	{
		id: 4,
		title: "iPhone 15 128GB",
		slug: "iphone-15-128gb",
		price: 10499000,
		images: ["/products/iphone-15.webp", "/products/iphone-15-2.webp"],
		brand: "Apple",
		category: smartphoneCategory,
		stock: 5,
		availability: true,
		code: "IPHONE15-128",
		shortDescription: "Apple ekotizimi va yuqori ishlashni xohlovchilar uchun.",
		description:
			"iPhone 15 zamonaviy dizayn, kuchli kamera va iOS tajribasini taklif qiladi.",
		monthlyPrice: 1225000,
		monthlyDuration: 12,
		rating: 4.9,
		reviewsText: "Premium",
		badge: "Apple",
		storeCount: 4,
		warranty: "12 oy",
		providers: ["Payme Nasiya"],
		specifications: [
			{ label: "Xotira", value: "128GB", group: "Asosiy xususiyatlar" },
			{
				label: "Ekran",
				value: "6.1 Super Retina",
				group: "Asosiy xususiyatlar",
			},
			{ label: "Chip", value: "A16 Bionic", group: "Asosiy xususiyatlar" },
			{ label: "Kamera", value: "48 MP", group: "Asosiy xususiyatlar" },
		],
		user: mockUser,
	},
	{
		id: 5,
		title: "Xiaomi Redmi Note 14 Pro",
		slug: "xiaomi-redmi-note-14-pro",
		price: 4599000,
		images: [
			"/products/redmi-note-14-pro.webp",
			"/products/redmi-note-14-pro-2.webp",
		],
		brand: "Xiaomi",
		category: smartphoneCategory,
		stock: 18,
		availability: true,
		code: "REDMI-NOTE14PRO",
		shortDescription: "Narx va imkoniyat muvozanati yaxshi model.",
		description:
			"Xiaomi Redmi Note 14 Pro kuchli protsessor, yaxshi kamera va chiroyli ekran bilan taqdim etiladi.",
		monthlyPrice: 537000,
		monthlyDuration: 12,
		rating: 4.6,
		reviewsText: "Tavsiya etiladi",
		storeCount: 12,
		warranty: "12 oy",
		providers: ["Uzum Nasiya", "Payme Nasiya"],
		specifications: [
			{ label: "Xotira", value: "8/256GB", group: "Asosiy xususiyatlar" },
			{ label: "Kamera", value: "200 MP", group: "Asosiy xususiyatlar" },
			{ label: "Batareya", value: "5100 mAh", group: "Asosiy xususiyatlar" },
			{ label: "Zaryad", value: "67W", group: "Asosiy xususiyatlar" },
		],
		user: mockUser,
	},
	{
		id: 6,
		title: "Nothing Phone 3a",
		slug: "nothing-phone-3a",
		price: 6299000,
		images: [
			"/products/nothing-phone-3a.webp",
			"/products/nothing-phone-3a-2.webp",
		],
		brand: "Nothing",
		category: smartphoneCategory,
		stock: 7,
		availability: true,
		code: "NOTHING-3A",
		shortDescription: "Minimalistik dizayn va o‘ziga xos ko‘rinish.",
		description:
			"Nothing Phone 3a original dizayn, toza interfeys va yaxshi kundalik performans beradi.",
		monthlyPrice: 735000,
		monthlyDuration: 12,
		rating: 4.5,
		reviewsText: "Yangi",
		storeCount: 3,
		warranty: "12 oy",
		providers: ["Alif Nasiya"],
		specifications: [
			{ label: "Xotira", value: "8/128GB", group: "Asosiy xususiyatlar" },
			{ label: "Ekran", value: "6.7 OLED", group: "Asosiy xususiyatlar" },
			{ label: "Batareya", value: "5000 mAh", group: "Asosiy xususiyatlar" },
			{ label: "Holati", value: "Yangi", group: "Asosiy xususiyatlar" },
		],
		user: mockUser,
	},
];

smartphoneCategory.products = hitProducts;

export function getProductBySlug(slug: string) {
	return hitProducts.find(
		product => (product.slug ?? slugifyProduct(product.title)) === slug,
	);
}

export const slides = [
	{
		title: "Galaxy S26 Ultra",
		subtitle: "Galaxy AI",
		slug: "galaxy-s26-ultra",
		image:
			"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "iPhone 17 Pro",
		subtitle: "New Era",
		slug: "iphone-17-pro",
		image:
			"https://images.unsplash.com/photo-1510552776732-03e61cf4b144?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Xiaomi 16 Ultra",
		subtitle: "Leica Power",
		slug: "xiaomi-16-ultra",
		image:
			"https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Pixel 11 Pro",
		subtitle: "Smart by Google",
		slug: "pixel-11-pro",
		image:
			"https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "Nothing Phone 4",
		subtitle: "Pure Design",
		slug: "nothing-phone-4",
		image:
			"https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1600&auto=format&fit=crop",
	},
	{
		title: "OnePlus 14",
		subtitle: "Fast and Fluid",
		slug: "oneplus-14",
		image:
			"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1600&auto=format&fit=crop",
	},
];

export const promotions: PromotionItem[] = [
	{
		slug: "ustamasiz-muddatli-tolov-0012",
		title: "Ustamasiz muddatli to'lov 0-0-12",
		period: "01 Yanvardan 31 Dekabrgacha",
		daysLeft: 648,
		kicker: "0% boshlang'ich to'lov, 0% ustama, 12 oyga bo'lib to'lash",
		description: [
			"Texnikalarni 0-0-12 muddatli to'lov asosida xarid qiling, ortiqcha va boshlang'ich to'lovsiz.",
			"Telefon, televizor, muzlatgich, kir yuvish mashinasi va boshqa texnikalarni 12 oy davomida bo'lib to'lash mumkin.",
		],
		highlights: [
			"Boshlang'ich to'lovsiz xarid",
			"12 oy davomida teng to'lov",
			"Eng ommabop texnikalarga amal qiladi",
		],
		newsTitle: "Yangilik",
		newsText:
			"Aksiya doirasida yangi smartfonlar, televizorlar va maishiy texnikalar uchun alohida tavsiyalar tayyorlandi.",
		opportunityTitle: "Yangi imkoniyatlar",
		opportunityText:
			"Onlayn rasmiylashtirish, tezkor tasdiqlash va do'kondan olib ketish xizmati bilan xarid yanada qulaylashdi.",
		products: [
			{ name: "iPhone 17", price: "12 999 000 so'm", tag: "Top savdo" },
			{ name: "Samsung TV 55", price: "7 499 000 so'm", tag: "0-0-12" },
			{ name: "LG Muzlatgich", price: "9 899 000 so'm", tag: "Chegirma" },
		],
	},
	{
		slug: "50-0-2",
		title: "50-0-2",
		period: "01 Yanvardan 31 Dekabrgacha",
		daysLeft: 648,
		kicker: "Tanlangan mahsulotlarda foydali takliflar",
		description: [
			"Aksiya doirasida ayrim mahsulotlar uchun maxsus to'lov va chegirma shartlari amal qiladi.",
			"Yangilanib boruvchi mahsulotlar ro'yxati orqali o'zingizga mos variantni tanlang.",
		],
		highlights: [
			"Tanlangan brendlarga amal qiladi",
			"Qulay muddatli to'lov",
			"Cheklangan muddat",
		],
		newsTitle: "Yangilik",
		newsText:
			"Hafta davomida aksiyaga yangi mahsulot kategoriyalari qo'shiladi.",
		opportunityTitle: "Yangi imkoniyatlar",
		opportunityText:
			"Onlayn xarid qilgan mijozlar uchun qo'shimcha qulayliklar mavjud.",
		products: [
			{ name: "Xiaomi 16 Ultra", price: "10 499 000 so'm", tag: "Aksiya" },
			{ name: "Dyson Supurgi", price: "6 299 000 so'm", tag: "Top" },
			{ name: "Aqlli soat", price: "1 899 000 so'm", tag: "Chegirma" },
		],
	},
	{
		slug: "kenwood-1-6",
		title: "Kenwood 1=6",
		period: "01 Yanvardan 31 Martgacha",
		daysLeft: 86,
		kicker: "Kenwood texnikalarida foydali aksiyalar",
		description: [
			"Kenwood mahsulotlarini xarid qilganingizda maxsus taklif va sovg'alar kutmoqda.",
			"Oshxona texnikalari orasida eng qulay narx va xizmatlar to'plami mavjud.",
		],
		highlights: [
			"Brend aksiyasi",
			"Sovg'ali takliflar",
			"Cheklangan mahsulot soni",
		],
		newsTitle: "Yangilik",
		newsText:
			"Kenwood yangi kolleksiyasi ayrim filiallarda allaqachon sotuvda.",
		opportunityTitle: "Yangi imkoniyatlar",
		opportunityText:
			"Rasmiy kafolat va bepul konsultatsiya bilan xarid qilishingiz mumkin.",
		products: [
			{ name: "Kenwood Blender", price: "1 499 000 so'm", tag: "Sovg'a" },
			{ name: "Kenwood Mikser", price: "2 249 000 so'm", tag: "Aksiya" },
			{ name: "Kenwood Toaster", price: "899 000 so'm", tag: "Top" },
		],
	},
];
