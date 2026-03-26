import api from "@/http/api";
import { loginSchema, registerSchema } from "@/lib/validation";
import { useAuthStore } from "@/store/useAuth.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export function useAuthLogin() {
	const { setStep } = useAuthStore();
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-login"],
		mutationFn: async (values: z.infer<typeof loginSchema>) => {
			const formData = new FormData();
			formData.append("phone", values.phoneNumber);
			formData.append("password", values.password);
			const res = await api.post("/api/auth/login", {
				phone: values.phoneNumber,
				password: values.password,
			});

			return res.data;
		},
		onSuccess: data => {
			setStep("verify");
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message || "Something want wrong");
		},
	});
	return { mutate, isPending };
}

export function useAuthRegister() {
	const { setStep } = useAuthStore();
	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-login"],
		mutationFn: async (values: z.infer<typeof registerSchema>) => {
			const formData = new FormData();
			formData.append("name", values.name);
			formData.append("phone", values.phoneNumber);
			formData.append("password", values.password);
			const res = await api.post("/api/auth/register", {
				name: values.name,
				phone: values.phoneNumber,
				password: values.password,
			});
			return res.data;
		},
		onSuccess: data => {
			setStep("verify");
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message || "Something want wrong");
		},
	});
	return { mutate, isPending };
}
