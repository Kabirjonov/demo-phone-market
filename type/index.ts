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
	images?: string[];
	parent_id?: number | null;
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

export type DeliveryMethod = "COURIER" | "PICKUP";
export type PaymentMethod = "CASH" | "CARD";
export type DeliveryStatus =
	| "NEW"
	| "CONFIRMED"
	| "SHIPPED"
	| "DELIVERED"
	| "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED";

export interface IOrderItem {
	id: number;
	orderId: number;
	productId: number;
	product: IProduct | null;
	productTitle: string;
	productImage: string | null;
	orderTimePrice: number;
	quantity: number;
	totalPrice: number;
}

export interface IOrder {
	id: number;
	userId: number | null;
	user: IUser | null;
	name: string;
	phone: string;
	region: string;
	district: string;
	address: string;
	comment: string | null;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
	deliveryStatus: DeliveryStatus;
	paymentStatus: PaymentStatus;
	subtotal: number;
	deliveryFee: number;
	totalAmount: number;
	items: IOrderItem[];
	createdAt: string;
	updatedAt: string;
}

export interface ICreateOrderItemInput {
	productId: number;
	quantity: number;
}

export interface ICreateOrderInput {
	userId?: number | null;
	name: string;
	phone: string;
	region: string;
	district: string;
	address: string;
	comment?: string | null;
	deliveryMethod: DeliveryMethod;
	paymentMethod: PaymentMethod;
	deliveryFee?: number | null;
	items: ICreateOrderItemInput[];
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
