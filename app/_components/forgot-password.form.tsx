"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatUzPhone } from "@/lib/PhoneFormater";
import {
	forgotPasswordSchema,
	resetPasswordSchema,
	type ForgotPasswordFormValues,
	type ResetPasswordFormValues,
} from "@/lib/validation";
import { useAuthForgotPassword, useAuthResetPassword } from "@/hooks/useAuth";
import { useAuthFlowStore } from "@/store/useAuth.store";

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

export default function ForgotPasswordForm() {
	const { t } = useTranslation();
	const { phone, setPhone, setStep, step } = useAuthFlowStore();
	const { mutate: sendCode, isPending: isSending } = useAuthForgotPassword();
	const { mutate: resetPassword, isPending: isResetting } =
		useAuthResetPassword();
	const [secondsLeft, setSecondsLeft] = useState(60);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const phoneForm = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			phoneNumber: phone || "+998",
		},
	});

	const resetForm = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			code: "",
			password: "",
			confirmPassword: "",
		},
	});

	useEffect(() => {
		if (secondsLeft <= 0 || !phone) {
			return;
		}

		const timer = window.setTimeout(() => {
			setSecondsLeft(previous => previous - 1);
		}, 1000);

		return () => window.clearTimeout(timer);
	}, [phone, secondsLeft]);

	const onPhoneSubmit = (values: ForgotPasswordFormValues) => {
		setPhone(values.phoneNumber);
		sendCode(values.phoneNumber);
		setSecondsLeft(60);
	};

	const onResetSubmit = (values: ResetPasswordFormValues) => {
		resetPassword({
			code: values.code,
			password: values.password,
		});
	};

	if (step === "forgotPassword") {
		return (
			<>
				<div className='mb-6 space-y-2'>
					<h1 className='text-2xl font-semibold tracking-tight text-foreground text-center'>
						{t("auth.forgotPassword.title")}
					</h1>
					<p className='text-sm leading-6 text-muted-foreground text-center'>
						{t("auth.forgotPassword.description")}
					</p>
				</div>

				<Form {...phoneForm}>
					<form
						onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
						className='space-y-5'
						noValidate
					>
						<FormField
							control={phoneForm.control}
							name='phoneNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("auth.forgotPassword.phoneLabel")}</FormLabel>
									<FormControl>
										<Input
											placeholder='+998901234567'
											autoComplete='tel'
											inputMode='tel'
											{...field}
											onChange={event =>
												field.onChange(formatUzPhone(event.target.value))
											}
											disabled={isSending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='submit'
							className='h-11 w-full rounded-2xl text-base'
							disabled={isSending}
						>
							{t("auth.forgotPassword.sendCode")}
						</Button>
					</form>
				</Form>

				<div className='mt-5 text-center text-sm text-muted-foreground'>
					<button
						type='button'
						onClick={() => setStep("login")}
						className='font-medium text-primary transition hover:underline'
					>
						{t("auth.forgotPassword.backToLogin")}
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<div className='mb-6 text-center'>
				<div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
					<ShieldAlert className='h-7 w-7' />
				</div>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
					{t("auth.resetPassword.title")}
				</h1>
				<p className='mt-2 text-sm leading-6 text-muted-foreground'>
					{t("auth.resetPassword.description")}{" "}
					<span className='font-medium text-foreground'>
						{formatPhoneForView(phone)}
					</span>
				</p>
			</div>

			<Form {...resetForm}>
				<form
					onSubmit={resetForm.handleSubmit(onResetSubmit)}
					className='space-y-5'
					noValidate
				>
					<FormField
						control={resetForm.control}
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
										// disabled={isPending}
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
					<FormField
						control={resetForm.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("auth.resetPassword.passwordLabel")}</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showPassword ? "text" : "password"}
											placeholder={t("auth.resetPassword.passwordPlaceholder")}
											autoComplete='new-password'
											className='pr-11'
											{...field}
											disabled={isResetting}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
											onClick={() => setShowPassword(prev => !prev)}
											disabled={isResetting}
										>
											{showPassword ? (
												<EyeOffIcon className='h-4 w-4' aria-hidden='true' />
											) : (
												<EyeIcon className='h-4 w-4' aria-hidden='true' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={resetForm.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{t("auth.resetPassword.confirmPasswordLabel")}
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											type={showConfirmPassword ? "text" : "password"}
											placeholder={t(
												"auth.resetPassword.confirmPasswordPlaceholder",
											)}
											autoComplete='new-password'
											className='pr-11'
											{...field}
											disabled={isResetting}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
											onClick={() => setShowConfirmPassword(prev => !prev)}
											disabled={isResetting}
										>
											{showConfirmPassword ? (
												<EyeOffIcon className='h-4 w-4' aria-hidden='true' />
											) : (
												<EyeIcon className='h-4 w-4' aria-hidden='true' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='h-11 w-full rounded-2xl text-base'
						disabled={isResetting}
					>
						{t("auth.resetPassword.submit")}
					</Button>
				</form>
			</Form>

			<div className='mt-5 space-y-3 text-center text-sm text-muted-foreground'>
				<div>
					{t("auth.resetPassword.codeNotReceived")}{" "}
					<Button
						type='button'
						disabled={secondsLeft > 0 || isSending}
						onClick={() => {
							sendCode(phone);
							setSecondsLeft(60);
						}}
						className='font-medium text-primary transition hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline'
					>
						{secondsLeft > 0
							? t("auth.resetPassword.resendIn", { seconds: secondsLeft })
							: t("auth.resetPassword.resend")}
					</Button>
				</div>

				<button
					type='button'
					onClick={() => {
						setPhone("");
						setStep("forgotPassword");
					}}
					className='font-medium text-primary transition hover:underline'
				>
					{t("auth.resetPassword.changePhone")}
				</button>
			</div>
		</>
	);
}
