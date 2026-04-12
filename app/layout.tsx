import Script from "next/script";
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

export const metadata = createDefaultMetadata();

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getRequestLocale();
	const dictionary = getDictionary(locale);
	return (
		<html lang='en' className='light'>
			<body
				className={`${fontSans.variable}  ${fontMono.variable} antialiased`}
			>
				<Script id='yandex-metrika' strategy='afterInteractive'>
					{`
						(function(m,e,t,r,i,k,a){
							m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
							m[i].l=1*new Date();
							for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
							k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
						})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=108265525', 'ym');

						ym(108265525, 'init', {
							ssr: true,
							webvisor: true,
							clickmap: true,
							ecommerce: 'dataLayer',
							referrer: document.referrer,
							url: location.href,
							accurateTrackBounce: true,
							trackLinks: true
						});
					`}
				</Script>
				<noscript>
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src='https://mc.yandex.ru/watch/108265525'
							style={{ position: "absolute", left: "-9999px" }}
							alt=''
						/>
					</div>
				</noscript>
				<MainProvider locale={locale} messages={dictionary}>
					<AppShell>{children}</AppShell>
				</MainProvider>
			</body>
		</html>
	);
}
