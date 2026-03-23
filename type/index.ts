export type IProduct = {
	id: number;
	title: string;
	image: string;
	price: number;
	monthlyPrice: number;
	monthlyDuration: number;
	rating?: number;
	reviewsText?: string;
	badge?: string;
	discount?: string;
	discountSecondary?: string;
};
