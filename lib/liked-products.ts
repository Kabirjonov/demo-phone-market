const LIKED_PRODUCTS_KEY = "liked_product_ids";
const LIKED_PRODUCTS_UPDATED_EVENT = "liked-products-updated";

function canUseStorage() {
	return typeof window !== "undefined";
}

export function getLikedProductIds(): number[] {
	if (!canUseStorage()) return [];

	try {
		const raw = window.localStorage.getItem(LIKED_PRODUCTS_KEY);
		if (!raw) return [];

		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];

		return parsed.filter(item => Number.isInteger(item));
	} catch {
		return [];
	}
}

function setLikedProductIds(ids: number[]) {
	if (!canUseStorage()) return;

	window.localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(ids));
	window.dispatchEvent(new Event(LIKED_PRODUCTS_UPDATED_EVENT));
}

export function isProductLiked(productId: number) {
	return getLikedProductIds().includes(productId);
}

export function toggleLikedProduct(productId: number) {
	const currentIds = getLikedProductIds();
	const isLiked = currentIds.includes(productId);

	if (isLiked) {
		setLikedProductIds(currentIds.filter(id => id !== productId));
		return false;
	}

	setLikedProductIds([...currentIds, productId]);
	return true;
}

export const likedProductsUpdatedEvent = LIKED_PRODUCTS_UPDATED_EVENT;
