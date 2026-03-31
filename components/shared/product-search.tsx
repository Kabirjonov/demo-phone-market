"use client";

import { FormEvent, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProductSearchProps = {
	className?: string;
	inputClassName?: string;
};

export function ProductSearch({
	className,
	inputClassName,
}: ProductSearchProps = {}) {
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
		<form
			onSubmit={handleSubmit}
			className={cn("hidden items-center gap-0.5 md:flex", className)}
		>
			<div className='relative'>
				<Input
					value={query}
					onChange={event => setQuery(event.target.value)}
					placeholder={t("nav.searchPlaceholder")}
					className={cn("pr-10", inputClassName)}
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
