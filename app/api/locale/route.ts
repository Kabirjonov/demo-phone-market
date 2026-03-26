import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
	defaultLocale,
	isValidLocale,
	localeCookieName,
	type Locale,
} from "@/lib/i18n";

type LocalePayload = {
	locale?: string;
};

export async function POST(request: Request) {
	let payload: LocalePayload | null = null;

	try {
		payload = (await request.json()) as LocalePayload;
	} catch {
		return NextResponse.json(
			{ message: "Invalid locale payload" },
			{ status: 400 },
		);
	}

	const nextLocale = payload?.locale;
	const locale: Locale = nextLocale && isValidLocale(nextLocale)
		? nextLocale
		: defaultLocale;

	const cookieStore = await cookies();
	cookieStore.set(localeCookieName, locale, {
		path: "/",
		httpOnly: false,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 365,
	});

	return NextResponse.json({ locale });
}
