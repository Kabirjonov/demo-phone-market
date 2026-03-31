"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSessionStore } from "@/store/useSession.store";
import { CheckCircle2, Shield, UserRound } from "lucide-react";

const profileFields = [
	{
		labelKey: "profilePage.fields.fullName",
		key: "name",
	},
	{
		labelKey: "profilePage.fields.phone",
		key: "phone",
	},
	{
		labelKey: "profilePage.fields.role",
		key: "role",
	},
] as const;

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.35,
			ease: "easeOut" as const,
		},
	},
};

export default function ProfilePage() {
	const { t } = useTranslation();
	const router = useRouter();
	const user = useSessionStore(state => state.user);
	const isAuth = useSessionStore(state => state.isAuth);
	const logout = useSessionStore(state => state.logout);
	const [isReady, setIsReady] = useState(() =>
		useSessionStore.persist.hasHydrated(),
	);

	useEffect(() => {
		const unsubscribeHydrate = useSessionStore.persist.onHydrate(() => {
			setIsReady(false);
		});
		const unsubscribeFinishHydration =
			useSessionStore.persist.onFinishHydration(() => {
				setIsReady(true);
			});

		return () => {
			unsubscribeHydrate();
			unsubscribeFinishHydration();
		};
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		if (!isAuth) {
			router.replace("/auth");
		}
	}, [isAuth, isReady, router]);

	if (!isReady || !isAuth || !user) {
		return (
			<section className='min-h-screen px-4 pb-20 pt-36'>
				<div className='container mx-auto max-w-5xl'>
					<div className='rounded-3xl border border-dashed p-8 text-center text-muted-foreground'>
						{t("profilePage.checking")}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.12),transparent_26%),linear-gradient(180deg,rgba(255,247,237,0.55),rgba(255,255,255,1)_24%)] px-4 pb-20 pt-36'>
			<motion.div
				className='container mx-auto max-w-5xl'
				variants={containerVariants}
				initial='hidden'
				animate='show'
			>
				<motion.div
					variants={itemVariants}
					className='relative mb-8 overflow-hidden rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_24%),linear-gradient(135deg,rgba(255,247,237,0.96),rgba(255,255,255,1)_52%,rgba(255,244,230,0.9))] p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)]'
				>
					<motion.div
						aria-hidden='true'
						className='absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl'
						animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
					/>
					<div className='relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
						<div className='flex items-start gap-4'>
							<motion.div
								initial={{ scale: 0.92, rotate: -8, opacity: 0 }}
								animate={{ scale: 1, rotate: 0, opacity: 1 }}
								transition={{ duration: 0.4, delay: 0.08 }}
								className='flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_12px_28px_rgba(249,115,22,0.16)]'
							>
								<UserRound className='size-8' />
							</motion.div>
							<div className='space-y-2'>
								<div className='flex flex-wrap items-center gap-2'>
									<h1 className='text-3xl font-semibold'>{user.name}</h1>
									<Badge variant={user.isVerified ? "default" : "outline"}>
										{user.isVerified
											? t("profilePage.verified")
											: t("profilePage.notVerified")}
									</Badge>
								</div>
								<p className='text-sm text-muted-foreground'>
									{t("profilePage.sessionDescription")}
								</p>
							</div>
						</div>

						<motion.div
							className='flex flex-wrap gap-3'
							variants={containerVariants}
						>
							<motion.div variants={itemVariants} whileHover={{ y: -2 }}>
								<Button variant='outline' asChild>
									<Link href='/liked'>{t("profilePage.actions.saved")}</Link>
								</Button>
							</motion.div>
							<motion.div variants={itemVariants} whileHover={{ y: -2 }}>
								<Button variant='outline' asChild>
									<Link href='/orders'>{t("profilePage.actions.orders")}</Link>
								</Button>
							</motion.div>
							<motion.div variants={itemVariants} whileHover={{ y: -2 }}>
								<Button
									variant='destructive'
									onClick={() => {
										logout();
										router.replace("/auth");
									}}
								>
									{t("profilePage.actions.logout")}
								</Button>
							</motion.div>
						</motion.div>
					</div>
				</motion.div>

				<div className='grid gap-6 lg:grid-cols-[1.5fr_0.9fr]'>
					<motion.div variants={itemVariants} whileHover={{ y: -4 }}>
						<Card className='border-border/70 bg-white/88 shadow-[0_16px_42px_rgba(15,23,42,0.05)] backdrop-blur'>
							<CardHeader>
								<CardTitle>{t("profilePage.personal.title")}</CardTitle>
								<CardDescription>
									{t("profilePage.personal.description")}
								</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-4 sm:grid-cols-2'>
								{profileFields.map(field => (
									<motion.div
										key={field.key}
										whileHover={{ y: -3, scale: 1.01 }}
										className='rounded-2xl border bg-muted/30 p-4 transition'
									>
										<p className='mb-1 text-sm text-muted-foreground'>
											{t(field.labelKey)}
										</p>
										<p className='text-base font-medium'>
											{user[field.key] || "-"}
										</p>
									</motion.div>
								))}
								<motion.div
									whileHover={{ y: -3, scale: 1.01 }}
									className='rounded-2xl border bg-muted/30 p-4 transition'
								>
									<p className='mb-1 text-sm text-muted-foreground'>
										{t("profilePage.fields.userId")}
									</p>
									<p className='break-all text-base font-medium'>{user.id}</p>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={itemVariants} whileHover={{ y: -4 }}>
						<Card className='border-border/70 bg-white/88 shadow-[0_16px_42px_rgba(15,23,42,0.05)] backdrop-blur'>
							<CardHeader>
								<CardTitle>{t("profilePage.status.title")}</CardTitle>
								<CardDescription>
									{t("profilePage.status.description")}
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<motion.div
									whileHover={{ x: 4 }}
									className='flex items-center gap-3 rounded-2xl border bg-muted/30 p-4'
								>
									<CheckCircle2 className='size-5 text-primary' />
									<div>
										<p className='font-medium'>
											{t("profilePage.status.phoneVerification.title")}
										</p>
										<p className='text-sm text-muted-foreground'>
											{user.isVerified
												? t("profilePage.status.phoneVerification.verified")
												: t("profilePage.status.phoneVerification.notVerified")}
										</p>
									</div>
								</motion.div>

								<motion.div
									whileHover={{ x: 4 }}
									className='flex items-center gap-3 rounded-2xl border bg-muted/30 p-4'
								>
									<Shield className='size-5 text-primary' />
									<div>
										<p className='font-medium'>
											{t("profilePage.status.accessLevel.title")}
										</p>
										<p className='text-sm capitalize text-muted-foreground'>
											{user.role}
										</p>
									</div>
								</motion.div>

								<motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
									<Button asChild className='w-full'>
										<Link href='/catalog'>
											{t("profilePage.actions.goCatalog")}
										</Link>
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
