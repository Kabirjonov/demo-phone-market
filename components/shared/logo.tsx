"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Logo() {
	const { theme } = useTheme();

	return (
		<div className='relative h-10 w-24 sm:h-12 sm:w-28 md:h-14 md:w-32'>
			<Image
				alt='logo'
				src={theme === "dark" ? "/logo_w.png" : "/logo.png"}
				fill
				className='object-contain'
				priority
			/>
		</div>
	);
}
