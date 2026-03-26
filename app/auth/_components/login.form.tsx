"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/store/useAuth.store";
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
import { loginSchema, type LoginFormValues } from "@/lib/validation";
import { formatUzPhone } from "@/lib/PhoneFormater";
import { useTranslation } from "react-i18next";
import { useAuthLogin } from "@/hooks/useAuth";

export default function LoginForm() {
	const { t } = useTranslation();
	const { mutate, isPending } = useAuthLogin();
	const { setStep, setPhone } = useAuthStore();
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			phoneNumber: "+998",
			password: "",
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		setPhone(values.phoneNumber);
		mutate(values);
	};

	return (
		<>
			<div className='mb-6 space-y-2'>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground text-center'>
					{t("auth.login.title")}
				</h1>
				<p className='text-sm leading-6 text-muted-foreground text-center'>
					{t("auth.login.description")}
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5'
					noValidate
				>
					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("auth.login.phoneLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder='+998901234567'
										autoComplete='tel'
										inputMode='tel'
										{...field}
										onChange={event =>
											field.onChange(formatUzPhone(event.target.value))
										}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("auth.login.passwordLabel")}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder={t("auth.login.passwordPlaceholder")}
										autoComplete='current-password'
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='h-11 w-full rounded-2xl text-base'
						disabled={isPending}
					>
						{t("auth.login.submit")}
					</Button>
				</form>
			</Form>

			<div className='mt-5 text-center text-sm text-muted-foreground flex justify-between'>
				<div className='text-sm'>
					<button
						type='button'
						onClick={() => setStep("register")}
						className='font-medium text-primary transition hover:underline'
					>
						{t("auth.login.registerLink")}
					</button>
				</div>
				<button
					type='button'
					onClick={() => setStep("register")}
					className='font-medium text-primary transition hover:underline'
				>
					{t("auth.login.forgotPassword")}
				</button>
			</div>
		</>
	);
}
