"use client";

import type { MouseEvent } from "react";
import { ShoppingCart } from "lucide-react";

import { useLikedProduct } from "@/hooks/useLikedProduct";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type LikedProductButtonProps = {
	productId: number;
	className?: string;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function LikedProductButton({
	productId,
	className,
	onClick,
}: LikedProductButtonProps) {
	const { liked, toggle } = useLikedProduct(productId);

	return (
		<Button
			size='icon'
			variant='outline'
			className={cn(
				"h-11 w-11 rounded-2xl border-2",
				liked
					? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
					: "border-primary",
				className,
			)}
			onClick={event => {
				onClick?.(event);
				if (event.defaultPrevented) {
					return;
				}

				toggle();
			}}
		>
			<ShoppingCart
				className={cn(liked ? "text-primary-foreground" : "text-primary")}
			/>
		</Button>
	);
}
