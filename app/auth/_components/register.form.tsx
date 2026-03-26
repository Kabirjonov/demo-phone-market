"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/store/useAuth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { registerSchema, type RegisterFormValues } from "@/lib/validation";
import { formatUzPhone } from "@/lib/PhoneFormater";
import { useTranslation } from "react-i18next";
import { useAuthRegister } from "@/hooks/useAuth";
export default function RegisterForm() {
	const { t } = useTranslation();
	const { setStep, setPhone } = useAuthStore();
	const { mutate, isPending } = useAuthRegister();
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			phoneNumber: "+998",
			password: "",
		},
	});

	const onSubmit = (values: RegisterFormValues) => {
		setPhone(values.phoneNumber);
		void values;
		mutate(values);
		// Backend integratsiya keyin shu yerga ulanadi.
		setStep("verify");
	};

	return (
		<>
			<div className='mb-6 space-y-2'>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
					{t("auth.register.title")}
				</h1>
				<p className='text-sm leading-6 text-muted-foreground'>
					{t("auth.register.description")}
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
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("auth.register.nameLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t("auth.register.namePlaceholder")}
										autoComplete='name'
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("auth.register.phoneLabel")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t("auth.register.phonePlaceholder")}
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
								<FormLabel>{t("auth.register.passwordLabel")}</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder={t("auth.register.passwordPlaceholder")}
										autoComplete='new-password'
										{...field}
										disabled={isPending}
									/>
								</FormControl>
								<FormDescription>
									{t("auth.register.passwordHint")}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='h-11 w-full rounded-2xl text-base'
						disabled={isPending}
					>
						{t("auth.register.submit")}
					</Button>
				</form>
			</Form>

			<div className='mt-5 text-center text-sm text-muted-foreground '>
				{t("auth.register.hasAccount")}{" "}
				<button
					type='button'
					onClick={() => setStep("login")}
					className='font-medium text-primary transition hover:underline'
				>
					{t("auth.register.loginLink")}
				</button>
			</div>
		</>
	);
}
