import React from "react";
import NavMenu from "../navMenu";

export default function MobileNavbar() {
	return (
		<div>
			<nav className='fixed left-1/2 bottom-0 z-50 h-16 w-full -translate-x-1/2 rounded-2xl  border bg-background/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur sm:w-[calc(100%-2rem)] xl:w-[80%]'>
				<div className='mx-auto flex h-full items-center w-fit justify-between px-4'>
					<NavMenu />
				</div>
			</nav>
		</div>
	);
}
