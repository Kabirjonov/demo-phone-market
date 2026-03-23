import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers/Main-provider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	// vercel.svg
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Texnool",
	description: "Texnool shop",
	icons: {
		icon: "/logo.png",
		shortcut: "/logo.png",
		apple: "/logo.png",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${fontSans.variable}  ${fontMono.variable} antialiased`}
			>
				<MainProvider locale={locale} messages={dictionary}>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</MainProvider>
			</body>
		</html>
	);
}
