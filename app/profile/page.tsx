"use client";

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
		<section className='min-h-screen px-4 pb-20 pt-36'>
			<div className='container mx-auto max-w-5xl'>
				<div className='mb-8 flex flex-col gap-4 rounded-[2rem] border bg-gradient-to-br from-background via-background to-muted/40 p-8 shadow-sm md:flex-row md:items-center md:justify-between'>
					<div className='flex items-start gap-4'>
						<div className='flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
							<UserRound className='size-8' />
						</div>
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

					<div className='flex flex-wrap gap-3'>
						<Button variant='outline' asChild>
							<Link href='/liked'>{t("profilePage.actions.saved")}</Link>
						</Button>
						<Button variant='outline' asChild>
							<Link href='/orders'>{t("profilePage.actions.orders")}</Link>
						</Button>
						<Button
							variant='destructive'
							onClick={() => {
								logout();
								router.replace("/auth");
							}}
						>
							{t("profilePage.actions.logout")}
						</Button>
					</div>
				</div>

				<div className='grid gap-6 lg:grid-cols-[1.5fr_0.9fr]'>
					<Card>
						<CardHeader>
							<CardTitle>{t("profilePage.personal.title")}</CardTitle>
							<CardDescription>
								{t("profilePage.personal.description")}
							</CardDescription>
						</CardHeader>
						<CardContent className='grid gap-4 sm:grid-cols-2'>
							{profileFields.map(field => (
								<div
									key={field.key}
									className='rounded-2xl border bg-muted/30 p-4'
								>
									<p className='mb-1 text-sm text-muted-foreground'>
										{t(field.labelKey)}
									</p>
									<p className='text-base font-medium'>
										{user[field.key] || "-"}
									</p>
								</div>
							))}
							<div className='rounded-2xl border bg-muted/30 p-4'>
								<p className='mb-1 text-sm text-muted-foreground'>
									{t("profilePage.fields.userId")}
								</p>
								<p className='break-all text-base font-medium'>{user.id}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("profilePage.status.title")}</CardTitle>
							<CardDescription>
								{t("profilePage.status.description")}
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center gap-3 rounded-2xl border bg-muted/30 p-4'>
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
							</div>

							<div className='flex items-center gap-3 rounded-2xl border bg-muted/30 p-4'>
								<Shield className='size-5 text-primary' />
								<div>
									<p className='font-medium'>
										{t("profilePage.status.accessLevel.title")}
									</p>
									<p className='text-sm capitalize text-muted-foreground'>
										{user.role}
									</p>
								</div>
							</div>

							<Button asChild className='w-full'>
								<Link href='/catalog'>{t("profilePage.actions.goCatalog")}</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
