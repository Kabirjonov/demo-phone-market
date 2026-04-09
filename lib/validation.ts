import { z } from "zod";

const normalizePhoneNumber = (value: string) => value.replace(/\D/g, "");

export const phoneNumberSchema = z
	.string()
	.trim()
	.min(1, "Telefon raqam kiriting")
	.refine(value => {
		const digits = normalizePhoneNumber(value);
		return digits.length === 12 && digits.startsWith("998");
	}, "Telefon raqam +998 90 123 45 67 formatida bo'lishi kerak");

export const passwordSchema = z
	.string()
	.min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak");

export const loginSchema = z.object({
	phoneNumber: phoneNumberSchema,
	password: passwordSchema,
});

export const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
	phoneNumber: phoneNumberSchema,
	password: passwordSchema,
});

export const verifySchema = z.object({
	code: z
		.string()
		.trim()
		.length(6, "Tasdiqlash kodi 6 ta raqam bo'lishi kerak")
		.regex(
			/^\d{6}$/,
			"Tasdiqlash kodi faqat raqamlardan iborat bo'lishi kerak",
		),
});

export const forgotPasswordSchema = z.object({
	phoneNumber: phoneNumberSchema,
});

export const resetPasswordSchema = z
	.object({
		code: z
			.string()
			.trim()
			.length(6, "Tasdiqlash kodi 6 ta raqam bo'lishi kerak")
			.regex(
				/^\d{6}$/,
				"Tasdiqlash kodi faqat raqamlardan iborat bo'lishi kerak",
			),
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine(values => values.password === values.confirmPassword, {
		message: "Parollar bir xil bo'lishi kerak",
		path: ["confirmPassword"],
	});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type VerifyFormValues = z.infer<typeof verifySchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
