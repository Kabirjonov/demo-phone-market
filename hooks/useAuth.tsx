import api from "@/http/api";
import { setAccessToken } from "@/lib/auth-token";
import { normalizePhone } from "@/lib/PhoneFormater";
import { loginSchema, registerSchema, verifySchema } from "@/lib/validation";
import { useAuthFlowStore } from "@/store/useAuth.store";
import { useSessionStore } from "@/store/useSession.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

type ApiErrorResponse = {
	message?: string;
};

function getErrorMessage(error: unknown) {
	if (error instanceof AxiosError) {
		return (
			(error.response?.data as ApiErrorResponse | undefined)?.message ||
			"Something want wrong"
		);
	}

	return "Something want wrong";
}

export function useAuthLogin() {
	const { resetFlow } = useAuthFlowStore();
	const { setUser } = useSessionStore();
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-login"],
		mutationFn: async (values: z.infer<typeof loginSchema>) => {
			const phone = normalizePhone(values.phoneNumber);
			const res = await api.post("/api/auth/login", {
				phone,
				password: values.password,
			});

			return res.data;
		},
		onSuccess: data => {
			if (data?.accessToken) {
				setAccessToken(data.accessToken);
			}

			if (data?.user) {
				setUser(data.user);
			}
			router.replace("/");
			resetFlow();
			toast.success(data.message);
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});
	return { mutate, isPending };
}

export function useAuthRegister() {
	const { setStep } = useAuthFlowStore();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-register"],
		mutationFn: async (values: z.infer<typeof registerSchema>) => {
			const phone = normalizePhone(values.phoneNumber);
			const res = await api.post("/api/auth/register", {
				name: values.name,
				phone: phone,
				password: values.password,
			});
			return res.data;
		},
		onSuccess: data => {
			setStep("verify");
			toast.success(data.message);
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});
	return { mutate, isPending };
}

export function useAuthVerify() {
	const { resetFlow, phone } = useAuthFlowStore();
	const { setUser } = useSessionStore();
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-verify"],
		mutationFn: async (values: z.infer<typeof verifySchema>) => {
			const res = await api.post("/api/auth/verify-phone", {
				phone: normalizePhone(phone),
				code: values.code,
			});

			return res.data;
		},
		onSuccess: data => {
			if (data?.accessToken) {
				setAccessToken(data.accessToken);
			}

			if (data?.user) {
				setUser(data.user);
			}
			router.replace("/");

			resetFlow();
			toast.success(data.message);
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});
	return { mutate, isPending };
}

export function useAuthForgotPassword() {
	const { setStep, setPhone } = useAuthFlowStore();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-forgot-password"],
		mutationFn: async (phoneNumber: string) => {
			const phone = normalizePhone(phoneNumber);
			const res = await api.post("/api/auth/forgot-password", {
				phone,
			});

			return res.data;
		},
		onSuccess: (data, phoneNumber) => {
			setPhone(phoneNumber);
			setStep("resetPassword");
			toast.success(data.message ?? "Tasdiqlash kodi yuborildi");
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});

	return { mutate, isPending };
}

export function useAuthResetPassword() {
	const { setStep, phone, resetFlow } = useAuthFlowStore();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-reset-password"],
		mutationFn: async (values: { code: string; password: string }) => {
			const res = await api.post("/api/auth/reset-password", {
				phone: normalizePhone(phone),
				code: values.code,
				password: values.password,
			});

			return res.data;
		},
		onSuccess: data => {
			toast.success(data.message ?? "Parol muvaffaqiyatli yangilandi");
			resetFlow();
			setStep("login");
		},
		onError: error => {
			toast.error(getErrorMessage(error));
		},
	});

	return { mutate, isPending };
}
