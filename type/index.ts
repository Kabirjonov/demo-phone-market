export type IProductSpecification = {
	label: string;
	value: string;
	group?: string;
};

export type ICategory = {
	id: number;
	title: string;
	slug: string;
};

export type IProductUser = {
	id: number;
	name: string;
	phone: string;
};

export type IProduct = {
	id: number;
	title: string;
	price: number;
	image: string[];
	slug?: string;
	brand: string;
	category?: ICategory;
	availability: boolean | string;
	code: string;
	description: string;
	user?: IProductUser;
	monthlyPrice: number;
	monthlyDuration: number;
	rating?: number;
	reviewsText?: string;
	badge?: string;
	discount?: string;
	discountSecondary?: string;
	capacity?: string;
	shortDescription?: string;
	storeCount?: number;
	warranty?: string;
	installmentNote?: string;
	providers?: string[];
	specifications?: IProductSpecification[];
};

export type PromotionItem = {
	slug: string;
	title: string;
	period: string;
	daysLeft: number;
	kicker: string;
	description: string[];
	highlights: string[];
	newsTitle: string;
	newsText: string;
	opportunityTitle: string;
	opportunityText: string;
	products: { name: string; price: string; tag: string }[];
};
