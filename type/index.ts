export type IProduct = {
	id: number;
	title: string;
	image: string[];
	price: number;
	monthlyPrice: number;
	monthlyDuration: number;
	rating?: number;
	reviewsText?: string;
	badge?: string;
	discount?: string;
	discountSecondary?: string;
	code?: string;
	brand?: string;
	capacity?: string;
	availability?: string;
	shortDescription?: string;
	storeCount?: number;
	warranty?: string;
	installmentNote?: string;
	providers?: string[];
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
