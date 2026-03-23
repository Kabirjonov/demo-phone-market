import CatalogSection from "@/components/sections/catalog";
import Hero from "@/components/sections/Hero";
import ProductSection from "@/components/sections/Products";
import { hitProducts } from "@/mockInfo/data";

export default function HomePage() {
	return (
		<div className='min-h-screen bg-background w-[80%] mx-auto'>
			<Hero />
			<CatalogSection />
			<ProductSection
				title='Xit savdo'
				products={hitProducts}
				viewAllHref='/products'
			/>
		</div>
	);
}
