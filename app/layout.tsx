import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers/Main-provider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${fontSans.variable}  ${fontMono.variable} antialiased`}
			>
				<MainProvider>
					<div className='min-h-screen'>
						<Navbar />
						<main>{children}</main>
						<Footer />
					</div>
				</MainProvider>
			</body>
		</html>
	);
}
