import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Products from "@/components/sections/Products";

export default function HomePage() {
	return (
		<div className='min-h-screen bg-background'>
			<Navbar />
			<Hero />
			<Products />
		</div>
	);
}
