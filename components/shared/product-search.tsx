"use client";

import { FormEvent, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductSearch() {
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const initialSearch = searchParams.get("search") ?? "";
	const [query, setQuery] = useState(initialSearch);

	useEffect(() => {
		setQuery(initialSearch);
	}, [initialSearch]);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedQuery = query.trim();

		if (!trimmedQuery) {
			router.push("/product");
			return;
		}

		router.push(`/product?search=${encodeURIComponent(trimmedQuery)}`);
	}

	function clearSearch() {
		setQuery("");

		if (pathname === "/product") {
			router.push("/product");
		}
	}

	return (
		<form onSubmit={handleSubmit} className='hidden md:flex items-center gap-0.5'>
			<div className='relative'>
				<Input
					value={query}
					onChange={event => setQuery(event.target.value)}
					placeholder={t("nav.searchPlaceholder")}
					className='pr-10'
				/>
				{query ? (
					<button
						type='button'
						onClick={clearSearch}
						className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground'
						aria-label='Clear search'
					>
						<X className='size-4' />
					</button>
				) : null}
			</div>
			<Button size='icon' type='submit'>
				<Search />
			</Button>
		</form>
	);
}
