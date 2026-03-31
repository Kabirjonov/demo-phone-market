import { createSeoMetadata } from "@/config/seo.config";
import type { Metadata } from "next";
import HomePage from "./_components/homePage";
//
export const metadata: Metadata = createSeoMetadata({
	title: "Bosh sahifa",
	description:
		"Texnool bosh sahifasida mashhur mahsulotlar, brendlar va yangi texnologiyalarni bir joyda toping.",
	path: "/",
});

export default function page() {
	return (
		<>
			<HomePage />
		</>
	);
}
