"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import NoSSR from "react-no-ssr";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/dictionaries";
import { I18nProvider } from "@/i18n/i18n-provider";
type AppProvidersProps = {
	children: ReactNode;
	locale: Locale;
	messages: Dictionary;
};
export default function MainProvider({
	children,
	locale,
	messages,
}: AppProvidersProps) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<I18nProvider locale={locale} messages={messages}>
				<QueryClientProvider client={queryClient}>
					<NoSSR>{children}</NoSSR>
				</QueryClientProvider>

				<Toaster />
			</I18nProvider>
		</ThemeProvider>
	);
}
