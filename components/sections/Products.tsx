import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IProduct } from "@/type";
import ProductCard from "../cards/product-card";

type ProductSectionProps = {
	title?: string;
	products: IProduct[];
	viewAllHref?: string;
};

export default function ProductSection({
	title,
	products,
	viewAllHref,
}: ProductSectionProps) {
	return (
		<section className='py-10'>
			<div className='container mx-auto px-4'>
				<div className='mb-8 flex items-center justify-between'>
					{title && <h2 className='text-3xl font-bold'>{title}</h2>}
					{viewAllHref && (
						<Link
							href={viewAllHref}
							className='flex items-center gap-2 text-lg font-medium text-blue-600 hover:underline'
						>
							Barchasini ko‘rish
							<ArrowRight size={18} />
						</Link>
					)}
				</div>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
}
