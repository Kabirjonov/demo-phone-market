"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/hooks/useAuth";
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
export default function RegisterForm() {
	const { setStep, setEmail } = useAuthStore();
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			phoneNumber: "+998",
			password: "",
		},
	});

	const onSubmit = (values: RegisterFormValues) => {
		setEmail(values.phoneNumber);
		void values;
		// Backend integratsiya keyin shu yerga ulanadi.
		setStep("verify");
	};

	return (
		<>
			<div className='mb-6 space-y-2'>
				<h1 className='text-2xl font-semibold tracking-tight text-foreground'>
					Ro&apos;yxatdan o&apos;tish
				</h1>
				<p className='text-sm leading-6 text-muted-foreground'>
					Ismingiz, telefon raqamingiz va parolingizni kiriting.
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
								<FormLabel>Ism</FormLabel>
								<FormControl>
									<Input
										placeholder='Ismingizni kiriting'
										autoComplete='name'
										{...field}
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
										placeholder='Parol yarating'
										autoComplete='new-password'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Parol kamida 6 ta belgidan iborat bo&apos;lsin.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='h-11 w-full rounded-2xl text-base'>
						Davom etish
					</Button>
				</form>
			</Form>

			<div className='mt-5 text-center text-sm text-muted-foreground '>
				Akkauntingiz bormi?{" "}
				<button
					type='button'
					onClick={() => setStep("login")}
					className='font-medium text-primary transition hover:underline'
				>
					Kirish
				</button>
			</div>
		</>
	);
}
