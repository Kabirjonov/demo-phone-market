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

export type MockCatalogItem = {
	name: string;
	slug?: string;
};

export function getMockCatalogItemSlug(item?: MockCatalogItem | null) {
	if (!item) {
		return "";
	}

	return item.slug || slugifyProduct(item.name);
}

export const slides = [
	{
		title: "Galaxy S26 Ultra",
		subtitle: "Galaxy AI",
		slug: "galaxy-s26-ultra",
	},
	{
		title: "iPhone 17 Pro",
		subtitle: "New Era",
		slug: "iphone-17-pro",
	},
	{
		title: "Xiaomi 16 Ultra",
		subtitle: "Leica Power",
		slug: "xiaomi-16-ultra",
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
	},
	{
		title: "OnePlus 14",
		subtitle: "Fast and Fluid",
		slug: "oneplus-14",
	},
];

export const promotions: PromotionItem[] = [
	{
		kind: "promotion",
		label: "Aksiya",
		slug: "ustamasiz-muddatli-tolov-0012",
		title: "Ustamasiz muddatli to'lov 0-0-12",
		summary:
			"Smartfon, televizor va maishiy texnikalarni 12 oyga 0% ustama bilan rasmiylashtirish mumkin.",
		publishedAt: "2026-03-20",
		period: "20 Martdan 30 Aprelgacha",
		image:
			"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1600&auto=format&fit=crop",
		daysLeft: 33,
		kicker:
			"0% boshlang'ich to'lov, 0% ustama va 12 oy davomida barqaror oylik to'lov.",
		description: [
			"Aksiya flagman smartfonlar, televizorlar, muzlatgichlar va kundalik maishiy texnikalarning tanlangan modellari uchun amal qiladi.",
			"Ariza onlayn tarzda 10-15 daqiqada ko'rib chiqiladi, tasdiqlangach buyurtmani filialdan olib ketish yoki yetkazib berish xizmatidan foydalanish mumkin.",
			"Taklif faqat hamkor banklar va nasiya platformalari orqali rasmiylashtirilgan buyurtmalarga tatbiq etiladi.",
		],
		highlights: [
			"Boshlang'ich to'lov talab qilinmaydi",
			"12 oy davomida teng oylik to'lov",
			"Top smartfon va TV modellari ro'yxatga kiritilgan",
		],
		sections: [
			{
				title: "Shartlar",
				text: "Mijoz pasport ma'lumotlari va faol telefon raqami bilan ariza yuboradi. Tasdiqdan keyin mahsulot narxi bo'yicha oylik to'lov jadvali bir zumda shakllanadi.",
			},
			{
				title: "Muhim eslatma",
				text: "Aksiya ombordagi qoldiq bilan cheklangan. Ayrim SKU'larda rang va xotira versiyalari bo'yicha narx farqi saqlanib qoladi.",
			},
		],
		products: [
			{ name: "iPhone 15 128GB", price: "10 499 000 so'm", tag: "0-0-12" },
			{ name: "Samsung Galaxy A56", price: "5 499 000 so'm", tag: "Top savdo" },
			{ name: 'LG 55" UHD TV', price: "7 899 000 so'm", tag: "Hamkor taklif" },
		],
	},
	{
		kind: "news",
		label: "Yangilik",
		image:
			"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
		slug: "samsung-a56-oldindan-buyurtma",
		title: "Samsung Galaxy A56 uchun oldindan buyurtma boshlandi",
		summary:
			"Yangi model savdosi ochildi va birinchi xaridorlar uchun bonus aksessuarlar paketi e'lon qilindi.",
		publishedAt: "2026-03-24",
		period: "24 Martdan 10 Aprelgacha",
		daysLeft: 13,
		kicker:
			"Oldindan buyurtma bergan mijozlar uchun quloqchin va bepul yetkazib berish taklifi mavjud.",
		description: [
			"Samsung Galaxy A56 8/256GB konfiguratsiyasi bilan savdoga chiqmoqda va do'kon vitrinasi hamda onlayn katalogga bir vaqtning o'zida joylandi.",
			"Birlamchi partiya bo'yicha yetkazib berish 3 ish kuni ichida amalga oshiriladi. Filialdan olib ketish opsiyasi ham mavjud.",
			"Oldindan buyurtma statusi shaxsiy kabinet va operator qo'ng'irog'i orqali tasdiqlanadi.",
		],
		highlights: [
			"8/256GB versiya birinchi bo'lib sotuvga chiqdi",
			"Bonus sifatida Galaxy Buds qopchasi beriladi",
			"Yetkazib berish va do'kondan olib ketish mavjud",
		],
		sections: [
			{
				title: "Nimalar yangilandi",
				text: "Mahsulot kartasiga to'liq texnik tavsif, kamera namunalariga oid blok va nasiya kalkulyatori qo'shildi.",
			},
			{
				title: "Sotuv bo'yicha izoh",
				text: "Birinchi partiya soni cheklangan. Keyingi yetkazib berish aprelning ikkinchi haftasiga rejalashtirilgan.",
			},
		],
		products: [
			{ name: "Samsung Galaxy A56", price: "5 499 000 so'm", tag: "Yangi" },
			{ name: "Galaxy Buds FE", price: "899 000 so'm", tag: "Bonus tavsiya" },
			{ name: "25W USB-C adapter", price: "249 000 so'm", tag: "Aksessuar" },
		],
	},
	{
		kind: "announcement",
		label: "E'lon",
		image:
			"https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1600&auto=format&fit=crop",
		slug: "ramazon-ish-jadvali-yetkazib-berish",
		title: "Ramazon oyidagi ish jadvali va yetkazib berish tartibi",
		summary:
			"Filiallar ish vaqti, call-markaz grafigi hamda buyurtmalarni yetkazish bo'yicha yangilangan jadval e'lon qilindi.",
		publishedAt: "2026-03-26",
		period: "26 Martdan 10 Aprelgacha",
		daysLeft: 13,
		kicker:
			"Bayramoldi kunlari ayrim filiallar qisqartirilgan rejimda ishlaydi, kuryer xizmati esa oldindan tasdiq bilan yetkazadi.",
		description: [
			"Shahar markazidagi filiallar 10:00 dan 21:00 gacha, savdo markazlaridagi nuqtalar esa 22:00 gacha xizmat ko'rsatadi.",
			"Yetkazib berish buyurtma yuklamasiga qarab 1 kundan 3 kungacha davom etishi mumkin. Operator buyurtma vaqtini alohida tasdiqlaydi.",
			"To'lov, muddatli to'lov va kafolat bo'yicha barcha xizmatlar avvalgi tartibda saqlanib qoladi.",
		],
		highlights: [
			"Filiallar bo'yicha yangilangan ish vaqti",
			"Kuryer xizmati oldindan qo'ng'iroq qiladi",
			"Call-markaz har kuni 09:00 dan 22:00 gacha ishlaydi",
		],
		sections: [
			{
				title: "Filiallar bo'yicha eslatma",
				text: "Ayrim hududiy filiallarda inventarizatsiya sababli buyurtmani yig'ish vaqti 24 soatgacha uzayishi mumkin.",
			},
			{
				title: "Mijozlar uchun tavsiya",
				text: "Bayramoldi xaridlarini kechiktirmaslik tavsiya etiladi. Ombordagi mashhur modellarda tez tugash holati kuzatilmoqda.",
			},
		],
	},
];

export const mockData = [
	{
		id: 1,
		title: "Smartfonlar va gadjetlar",
		titleKey: "catalogSection.categories.smartphones",
		image: "/catalog/1.webp",
		items: [
			{ name: "Smartfonlar", slug: "phone" },
			{ name: "Smartfonlar", slug: "phone" },
			{ name: "Telefonlar", slug: "phone" },
			{ name: "Planshetlar", slug: "tablet" },
			{ name: "Gadjetlar", slug: "gadget" },
			{ name: "Telefon aksessuarlari", slug: "phone-accessories" },
		],
	},
	{
		id: 2,
		title: "Kompyuter texnikasi",
		titleKey: "catalogSection.categories.computers",
		image: "/catalog/2.webp",
		items: [
			{ name: "Noutbuklar", slug: "laptop" },
			{ name: "Monitorlar", slug: "monitor" },
			{ name: "Monobloklar", slug: "monoblock" },
			{ name: "Kompyuter aksessuarlari", slug: "computer-accessories" },
			{ name: "Tashqi qattiq disklar", slug: "external-drives" },
			{ name: "Flash xotiralar", slug: "flash-storage" },
			{ name: "Kolonkalar", slug: "speakers" },
			{ name: "Stabilizatorlar", slug: "stabilizers" },
		],
	},
	{
		id: 3,
		title: " Televizorlar va audiotexnikalar ",
		titleKey: "catalogSection.categories.tvAudio",
		image: "/catalog/3.webp",
		items: [
			{ name: "Noutbuklar", slug: "laptop" },
			{ name: "Monitorlar", slug: "monitor" },
			{ name: "Monobloklar", slug: "monoblock" },
			{ name: "Kompyuter aksessuarlari", slug: "computer-accessories" },
			{ name: "Tashqi qattiq disklar", slug: "external-drives" },
			{ name: "Flash xotiralar", slug: "flash-storage" },
			{ name: "Kolonkalar", slug: "speakers" },
			{ name: "Stabilizatorlar", slug: "stabilizers" },
		],
	},
	{
		id: 4,
		title: "Iqlim texnikasi ",
		titleKey: "catalogSection.categories.climate",
		image: "/catalog/4.webp",
		items: [
			{ name: "Noutbuklar", slug: "laptop" },
			{ name: "Monitorlar", slug: "monitor" },
			{ name: "Monobloklar", slug: "monoblock" },
			{ name: "Kompyuter aksessuarlari", slug: "computer-accessories" },
			{ name: "Tashqi qattiq disklar", slug: "external-drives" },
			{ name: "Flash xotiralar", slug: "flash-storage" },
			{ name: "Kolonkalar", slug: "speakers" },
			{ name: "Stabilizatorlar", slug: "stabilizers" },
		],
	},
	{
		id: 5,
		title: "Maishiy texnika ",
		titleKey: "catalogSection.categories.homeAppliances",
		image: "/catalog/5.webp",
		items: [
			{ name: "Televizorlar", slug: "tv" },
			{ name: "TV aksessuarlari", slug: "tv-accessories" },
			{ name: "Musiqiy markazlar", slug: "music-centers" },
			{ name: "Simsiz kolonkalar", slug: "wireless-speakers" },
			{ name: "Soundbarlar", slug: "soundbars" },
			{ name: "TV obuna", slug: "tv-subscription" },
		],
	},

	{
		id: 6,
		title: "Maishiy texnika ",
		titleKey: "catalogSection.categories.household",
		image: "/catalog/6.webp",
		items: [
			{ name: "Konditsionerlar", slug: "air-conditioners" },
			{ name: "Ventilyatorlar", slug: "fans" },
			{ name: "Isitgichlar", slug: "heaters" },
			{ name: "Suv isitgichlar", slug: "water-heaters" },
			{ name: "Namlagichlar", slug: "humidifiers" },
			{ name: "Havo tozalagichlar", slug: "air-purifiers" },
		],
	},
	{
		id: 7,
		title: "Oshxona uchun texnika ",
		titleKey: "catalogSection.categories.kitchen",
		image: "/catalog/7.webp",
		items: [
			{ name: "Uy parvarishi tovarlari", slug: "home-care" },
			{ name: "Kiyim parvarishi mahsulotlari", slug: "clothing-care" },
			{ name: "Dispenserlar", slug: "dispensers" },
		],
	},
];
