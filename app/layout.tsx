import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers/Main-provider";
import AppShell from "@/components/shared/App-shell";
import { createDefaultMetadata } from "@/config/seo.config";
import { getDictionary } from "@/lib/dictionaries";
import { getRequestLocale } from "@/lib/request-locale";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

// export const metadata: Metadata = createDefaultMetadata();
export const metadata = {
	icons: {
		icon: "/favicon.jpg", // Reference path from the /public directory
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
					<AppShell>{children}</AppShell>
				</MainProvider>
			</body>
		</html>
	);
}
