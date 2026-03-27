import api from "@/http/api";
import { normalizePhone } from "@/lib/PhoneFormater";
import { loginSchema, registerSchema, verifySchema } from "@/lib/validation";
import { useAuthFlowStore } from "@/store/useAuth.store";
import { useSessionStore } from "@/store/useSession.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

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
				localStorage.setItem("accessToken", data.accessToken);
			}

			if (data?.user) {
				setUser(data.user);
			}
			router.replace("/");
			resetFlow();
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message || "Something want wrong");
		},
	});
	return { mutate, isPending };
}

export function useAuthRegister() {
	const { setStep } = useAuthFlowStore();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-register"],
		mutationFn: async (values: z.infer<typeof registerSchema>) => {
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

export function useAuthVerify() {
	const { resetFlow, phone } = useAuthFlowStore();
	const { setUser } = useSessionStore();
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ["auth-verify"],
		mutationFn: async (values: z.infer<typeof verifySchema>) => {
			const res = await api.post("/api/auth/verify-phone", {
				phone: phone,
				code: values.code,
			});

			return res.data;
		},
		onSuccess: data => {
			if (data?.accessToken) {
				localStorage.setItem("accessToken", data.accessToken);
			}

			if (data?.user) {
				setUser(data.user);
			}
			router.replace("/");

			resetFlow();
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.error(error.response.data.message || "Something want wrong");
		},
	});
	return { mutate, isPending };
}
