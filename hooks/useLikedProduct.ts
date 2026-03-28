"use client";

import { useEffect, useState } from "react";

import {
	isProductLiked,
	likedProductsUpdatedEvent,
	toggleLikedProduct,
} from "@/lib/liked-products";

export function useLikedProduct(productId: string | number) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const syncLikedState = () => setLiked(isProductLiked(productId));

		syncLikedState();
		window.addEventListener("storage", syncLikedState);
		window.addEventListener(likedProductsUpdatedEvent, syncLikedState);

		return () => {
			window.removeEventListener("storage", syncLikedState);
			window.removeEventListener(likedProductsUpdatedEvent, syncLikedState);
		};
	}, [productId]);

	const toggle = () => {
		const nextLikedState = toggleLikedProduct(productId);
		setLiked(nextLikedState);
		return nextLikedState;
	};

	return {
		liked,
		toggle,
	};
}
