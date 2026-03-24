"use client";

// import { getServerSession } from "next-auth";
// import { authConfig } from "@/config/auth.config";
import Logo from "@/components/shared/logo";
import { useAuthStore } from "@/hooks/useAuth";
import StateAuth from "./(page)/state";
import SocialAuth from "./(page)/social";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
	const { step } = useAuthStore();

	// const session = await getServerSession(authConfig);
	// if (session) {
	// return redirect("/");
	// }
	return (
		<div className='relative'>
			<div className='container p-1 max-w-md mx-auto w-full h-screen flex justify-center items-center flex-col space-y-4'>
				{/* <FaTelegram size={120} className='text-blue-500' /> */}
				<Logo />
				<div>
					{/* <h1 className='text-4xl font-bold text-center'>Telegram</h1> */}
				</div>
				<div className='w-full space-y-5 rounded-[28px] border border-border/70 bg-background p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]'>
					<StateAuth />
					{step !== "verify" ? (
						<>
							<div className='relative py-1'>
								<Separator />
								<span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground'>
									yoki
								</span>
							</div>
							<SocialAuth />
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}
