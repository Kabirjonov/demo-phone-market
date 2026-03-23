import ProductSection from "@/components/sections/Products";
import { hitProducts } from "@/mockInfo/data";
import React from "react";

export default function page() {
	return (
		<div>
			<ProductSection
				title='Xit savdo'
				products={hitProducts}
				viewAllHref='/products'
			/>
			<ProductSection
				title='Foydali xaridlar'
				products={hitProducts}
				viewAllHref='/products'
			/>
			<ProductSection title='' products={hitProducts} viewAllHref='/products' />
		</div>
	);
}
