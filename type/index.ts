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

	// not-need
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
	// slug: string;
	brand: string;
	categoryId: string;
	code: string;
	stock: string;
	shortDescription: string;
	description: string;
	imagesText: string;
	specifications: IProductSpecification[];
}

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
