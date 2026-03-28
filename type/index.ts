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
	// monthlyPrice: number;
	// monthlyDuration: number;
	// rating?: number;
	// reviewsText?: string;
	// badge?: string;
	// discount?: string;
	// discountSecondary?: string;
	// capacity?: string;
	// storeCount?: number;
	// warranty?: string;
	// installmentNote?: string;
	// providers?: string[];
	// availability: boolean;
	// user: IUser;
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

export type PromotionKind = "promotion" | "news" | "announcement";

export type PromotionProduct = {
	name: string;
	price: string;
	tag: string;
};

export type PromotionSection = {
	title: string;
	text: string;
};

export type PromotionItem = {
	kind: PromotionKind;
	label: string;
	image: string;
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	period: string;
	daysLeft: number;
	kicker: string;
	description: string[];
	highlights: string[];
	sections: PromotionSection[];
	products?: PromotionProduct[];
};
