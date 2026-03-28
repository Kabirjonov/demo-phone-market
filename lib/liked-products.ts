const LIKED_PRODUCTS_KEY = "liked_product_ids";
const LIKED_PRODUCTS_UPDATED_EVENT = "liked-products-updated";

function normalizeProductId(productId: string | number) {
	return String(productId);
}

function canUseStorage() {
	return typeof window !== "undefined";
}

export function getLikedProductIds(): string[] {
	if (!canUseStorage()) return [];

	try {
		const raw = window.localStorage.getItem(LIKED_PRODUCTS_KEY);
		if (!raw) return [];

		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];

		return parsed
			.map(item => {
				if (typeof item === "string" || typeof item === "number") {
					return String(item);
				}

				return null;
			})
			.filter((item): item is string => Boolean(item));
	} catch {
		return [];
	}
}

function setLikedProductIds(ids: string[]) {
	if (!canUseStorage()) return;

	window.localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(ids));
	window.dispatchEvent(new Event(LIKED_PRODUCTS_UPDATED_EVENT));
}

export function isProductLiked(productId: string | number) {
	return getLikedProductIds().includes(normalizeProductId(productId));
}

export function toggleLikedProduct(productId: string | number) {
	const normalizedProductId = normalizeProductId(productId);
	const currentIds = getLikedProductIds();
	const isLiked = currentIds.includes(normalizedProductId);

	if (isLiked) {
		setLikedProductIds(currentIds.filter(id => id !== normalizedProductId));
		return false;
	}

	setLikedProductIds([...currentIds, normalizedProductId]);
	return true;
}

export const likedProductsUpdatedEvent = LIKED_PRODUCTS_UPDATED_EVENT;
