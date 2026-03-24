"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Smartphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { verifySchema, type VerifyFormValues } from "@/lib/validation";

function formatPhoneForView(phone: string) {
	if (!phone) {
		return "+998 XX XXX XX XX";
	}

	const digits = phone.replace(/\D/g, "");
	if (digits.length < 12) {
		return phone;
	}

	return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
		5,
		8,
	)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
}

export default function VerifyForm() {
	const { email, setStep } = useAuthStore();
	const [secondsLeft, setSecondsLeft] = useState(60);
	const form = useForm<VerifyFormValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: "",
		},
	});

	useEffect(() => {
		if (secondsLeft <= 0) {
			return;
		}

		const timer = window.setTimeout(() => {
			setSecondsLeft(previous => previous - 1);
		}, 1000);

		return () => window.clearTimeout(timer);
	}, [secondsLeft]);

	const onSubmit = (values: VerifyFormValues) => {
		void values;
		// Backend integratsiya keyin shu yerga ulanadi.
	};

	return (
		<>
			<div className='mb-6 text-center'>
				<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
					<ShieldCheck className='h-7 w-7' />
				</div>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
					Tasdiqlash kodi
				</h1>
				<p className='mt-2 text-sm leading-6 text-muted-foreground'>
					Kod <span className='font-medium text-foreground'>{formatPhoneForView(email)}</span>{" "}
					raqamiga yuborildi.
				</p>
			</div>

			<div className='mb-5 rounded-2xl border border-border/70 bg-muted/30 p-4'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary shadow-sm'>
						<Smartphone className='h-5 w-5' />
					</div>
					<div>
						<p className='text-sm font-medium text-foreground'>SMS tasdiqlash</p>
						<p className='text-xs text-muted-foreground'>
							6 xonali kodni kiriting
						</p>
					</div>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5'
					noValidate
				>
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tasdiqlash kodi</FormLabel>
								<FormControl>
									<Input
										placeholder='123456'
										autoComplete='one-time-code'
										inputMode='numeric'
										maxLength={6}
										className='h-12 text-center text-lg tracking-[0.35em]'
										{...field}
										onChange={event =>
											field.onChange(
												event.target.value.replace(/\D/g, "").slice(0, 6),
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='h-11 w-full rounded-2xl text-base'>
						Tasdiqlash
					</Button>
				</form>
			</Form>

			<div className='mt-5 space-y-3 text-center text-sm text-muted-foreground'>
				<div>
					Kod kelmadimi?{" "}
					<button
						type='button'
						disabled={secondsLeft > 0}
						onClick={() => setSecondsLeft(60)}
						className='font-medium text-primary transition hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline'
					>
						{secondsLeft > 0
							? `Qayta yuborish ${secondsLeft}s`
							: "Qayta yuborish"}
					</button>
				</div>

				<button
					type='button'
					onClick={() => setStep("login")}
					className='font-medium text-primary transition hover:underline'
				>
					Raqamni o&apos;zgartirish
				</button>
			</div>
		</>
	);
}
