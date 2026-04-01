import type { MetadataRoute } from "next";

import { seoConfig } from "@/config/seo.config";
import { Base_Url } from "@/http/api";
import { buildCategoryTree } from "@/lib/category-tree";
import { resolveProductImage } from "@/lib/resolveProductImage";
import { slugifyProduct } from "@/lib/slugify";
import { promotions } from "@/mockInfo/data";
import type { IProduct } from "@/type";
import type { ICategory } from "@/type";

const now = new Date();
const GET_PRODUCTS_SITEMAP_QUERY = `
	query GetProductsForSitemap($limit: Int!, $offset: Int!) {
		products(limit: $limit, offset: $offset) {
			items {
				id
				title
				slug
				images
			}
		}
	}
`;

const GET_CATEGORIES_SITEMAP_QUERY = `
	query GetCategoriesForSitemap {
		categories {
			id
			name
			slug
			images
			parent_id
		}
	}
`;

type SitemapProductsResponse = {
	data?: {
		products?: {
			items?: IProduct[];
		};
	};
};

type SitemapCategoriesResponse = {
	data?: {
		categories?: ICategory[];
	};
};

async function getProductsForSitemap() {
	try {
		const response = await fetch(`${Base_Url}/graphql`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: GET_PRODUCTS_SITEMAP_QUERY,
				variables: {
					limit: 1000,
					offset: 0,
				},
			}),
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			return [];
		}

		const payload = (await response.json()) as SitemapProductsResponse;
		return payload.data?.products?.items ?? [];
	} catch {
		return [];
	}
}

async function getCategoriesForSitemap() {
	try {
		const response = await fetch(`${Base_Url}/graphql`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: GET_CATEGORIES_SITEMAP_QUERY,
			}),
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			return [];
		}

		const payload = (await response.json()) as SitemapCategoriesResponse;
		return payload.data?.categories ?? [];
	} catch {
		return [];
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const categories = await getCategoriesForSitemap();
	const categoryTree = buildCategoryTree(categories);
	const catalogSlugs = [
		...new Set(
			[
				...categoryTree.map(category => category.slug),
				...categoryTree.flatMap(category => category.items.map(item => item.slug)),
			].filter(Boolean),
		),
	];
	const products = await getProductsForSitemap();
	const getProductSlug = (slug?: string, title?: string) =>
		slug || slugifyProduct(title ?? "");

	const catalogRoutes: MetadataRoute.Sitemap = catalogSlugs.map(slug => ({
		url: `${seoConfig.url}/catalog/${slug}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.7,
	}));

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

	const productRoutes: MetadataRoute.Sitemap = products.map(product => ({
		url: `${seoConfig.url}/product/${getProductSlug(
			product.slug,
			product.title,
		)}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.8,
		images: (product.images ?? []).map(image => {
			const resolvedImage = resolveProductImage(image);
			return resolvedImage.startsWith("http")
				? resolvedImage
				: `${seoConfig.url}${resolvedImage}`;
		}),
	}));

	const catalogProductRoutes: MetadataRoute.Sitemap = products.map(product => ({
		url: `${seoConfig.url}/catalog/${getProductSlug(
			product.slug,
			product.title,
		)}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: 0.7,
	}));

	const promotionRoutes: MetadataRoute.Sitemap = promotions.map(promotion => ({
		url: `${seoConfig.url}/promotions/${promotion.slug}`,
		lastModified: new Date(promotion.publishedAt),
		changeFrequency: "daily",
		priority: 0.8,
	}));

	return [
		...staticRoutes,
		...catalogRoutes,
		...productRoutes,
		...catalogProductRoutes,
		...promotionRoutes,
	];
}
