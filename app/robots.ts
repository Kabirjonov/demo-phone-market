import type { MetadataRoute } from "next";

import { seoConfig } from "@/config/seo.config";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/liked", "/wishlist"],
		},
		sitemap: `${seoConfig.url}/sitemap.xml`,
		host: seoConfig.url,
	};
}
