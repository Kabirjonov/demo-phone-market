import type { Metadata } from "next";

type SeoInput = {
	title?: string;
	description?: string;
	path?: string;
	keywords?: string[];
	image?: string;
	noIndex?: boolean;
	type?: "website" | "article";
};

export const seoConfig = {
	siteName: "Texnool",
	defaultTitle: "Texnool",
	titleTemplate: "%s | Texnool",
	description:
		"Texnool internet-do'konida smartfonlar, televizorlar, maishiy texnika va foydali aksiyalarni qulay narxlarda toping.",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://texnool.uz",
	locale: "uz_UZ",
	keywords: [
		"Texnool",
		"telefon market",
		"texnika do'koni",
		"smartfonlar",
		"maishiy texnika",
		"Toshkent texnika",
		"aksiyalar",
		"muddatli to'lov",
		"Oxunjon Kabirjonov",
		"Kabirjonov Oxunjon",
	],
	image: "/icon.png",
};

export function absoluteUrl(path = "/") {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return new URL(normalizedPath, seoConfig.url);
}

export function createSeoMetadata({
	title,
	description = seoConfig.description,
	path = "/",
	keywords = [],
	image = seoConfig.image,
	noIndex = false,
	type = "website",
}: SeoInput = {}): Metadata {
	const fullTitle = title ?? seoConfig.defaultTitle;
	const canonical = absoluteUrl(path);
	const imageUrl = absoluteUrl(image);

	return {
		title: fullTitle,
		description,
		keywords: [...seoConfig.keywords, ...keywords],
		alternates: {
			canonical,
		},
		openGraph: {
			type,
			locale: seoConfig.locale,
			url: canonical,
			siteName: seoConfig.siteName,
			title: fullTitle,
			description,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: fullTitle,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
			images: [imageUrl],
		},
		robots: noIndex
			? {
					index: false,
					follow: false,
				}
			: {
					index: true,
					follow: true,
				},
	};
}

export function createDefaultMetadata(): Metadata {
	return {
		metadataBase: new URL(seoConfig.url),
		title: {
			default: seoConfig.defaultTitle,
			template: seoConfig.titleTemplate,
		},
		description: seoConfig.description,
		applicationName: seoConfig.siteName,
		// icons: {
		// 	icon: "/icon.jpg",
		// 	shortcut: "/icon.jpg",
		// 	apple: "/icon.jpg",
		// },
		icons: {
			icon: [
				{ url: "/favicon.ico" },
				{ url: "/icon.png", type: "image/png", sizes: "512x512" },
			],
			apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
			shortcut: ["/favicon.ico"],
		},
		openGraph: {
			siteName: seoConfig.siteName,
			locale: seoConfig.locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}
