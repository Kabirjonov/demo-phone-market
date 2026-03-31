"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
	textToCopy: string;
	children?: React.ReactNode;
}

export function CopyButton({
	textToCopy,
	children,
	...props
}: CopyButtonProps) {
	const [isCopied, setIsCopied] = React.useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<Button onClick={copyToClipboard} {...props}>
			{children || (isCopied ? "Copied!" : "Copy")}

			{isCopied ? (
				<Check className='mr-2 h-4 w-4' />
			) : (
				<Copy className='mr-2 h-4 w-4' />
			)}
		</Button>
	);
}
