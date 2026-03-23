import { getProductBySlug } from "@/mockInfo/data";
import { notFound } from "next/navigation";
import React from "react";

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
