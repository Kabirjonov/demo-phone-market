"use client";

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
import { loginSchema, type LoginFormValues } from "@/lib/validation";
import { formatUzPhone } from "@/lib/PhoneFormater";

export default function LoginForm() {
	const { setStep, setEmail } = useAuthStore();
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			phoneNumber: "+998",
			password: "",
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		setEmail(values.phoneNumber);
		void values;
		// Backend integratsiya keyin shu yerga ulanadi.
		setStep("verify");
	};

	return (
		<>
			<div className='mb-6 space-y-2'>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground text-center'>
					Kirish
				</h1>
				<p className='text-sm leading-6 text-muted-foreground text-center'>
					Telefon raqamingiz va parolingizni kiriting.
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
								<FormLabel>Telefon raqam</FormLabel>
								<FormControl>
									<Input
										placeholder='+998901234567'
										autoComplete='tel'
										inputMode='tel'
										{...field}
										onChange={event =>
											field.onChange(formatUzPhone(event.target.value))
										}
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
								<FormLabel>Parol</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Parolingizni kiriting'
										autoComplete='current-password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='h-11 w-full rounded-2xl text-base'>
						Kirish
					</Button>
				</form>
			</Form>

			<div className='mt-5 text-center text-sm text-muted-foreground flex justify-between'>
				<div className='text-sm'>
					Akkauntingiz yo&apos;qmi?{" "}
					<button
						type='button'
						onClick={() => setStep("register")}
						className='font-medium text-primary transition hover:underline'
					>
						Ro&apos;yxatdan o&apos;tish
					</button>
				</div>
				<button
					type='button'
					onClick={() => setStep("register")}
					className='font-medium text-primary transition hover:underline'
				>
					Forgot Password{" "}
				</button>
			</div>
		</>
	);
}
