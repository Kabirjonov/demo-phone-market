import type { MetadataRoute } from "next";

import { seoConfig } from "@/config/seo.config";
import { hitProducts, promotions, slugifyProduct } from "@/mockInfo/data";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: seoConfig.url,
			lastModified: now,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${seoConfig.url}/catalog`,
			lastModified: now,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${seoConfig.url}/product`,
			lastModified: now,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${seoConfig.url}/promotions`,
			lastModified: now,
			changeFrequency: "daily",
			priority: 0.9,
		},
	];

	const productRoutes: MetadataRoute.Sitemap = hitProducts.map(product => ({
		url: `${seoConfig.url}/product/detail/${slugifyProduct(product.title)}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.8,
		images: product.image.map(image => `${seoConfig.url}${image}`),
	}));

	const catalogDetailRoutes: MetadataRoute.Sitemap = hitProducts.map(product => ({
		url: `${seoConfig.url}/catalog/${slugifyProduct(product.title)}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	const promotionRoutes: MetadataRoute.Sitemap = promotions.map(promotion => ({
		url: `${seoConfig.url}/promotions/${promotion.slug}`,
		lastModified: now,
		changeFrequency: "daily",
		priority: 0.8,
	}));

	return [
		...staticRoutes,
		...productRoutes,
		...catalogDetailRoutes,
		...promotionRoutes,
	];
}
