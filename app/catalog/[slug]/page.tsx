import type { Metadata } from "next";

import { getProductBySlug } from "@/mockInfo/data";
import { createSeoMetadata } from "@/config/seo.config";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		return createSeoMetadata({
			title: "Katalog tafsiloti topilmadi",
			description: "So'ralgan katalog elementi topilmadi.",
			path: `/catalog/${slug}`,
			noIndex: true,
		});
	}

	return createSeoMetadata({
		title: product.title,
		description:
			product.shortDescription ||
			`${product.title} haqida qisqacha ma'lumot, narx va mavjudlik tafsilotlari.`,
		path: `/catalog/${slug}`,
		keywords: [product.brand ?? "", product.capacity ?? "", "katalog"].filter(
			Boolean,
		),
	});
}

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return <div>{product.title}</div>;
}
