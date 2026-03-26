"use client";

import { useAuthStore } from "@/store/useAuth.store";
import LoginForm from "../_components/login.form";
import RegisterForm from "../_components/register.form";
import VerifyForm from "../_components/verify.form";

export default function StateAuth() {
	const { step } = useAuthStore();
	return (
		<>
			{step == "login" && <LoginForm />}
			{step == "register" && <RegisterForm />}
			{step == "verify" && <VerifyForm />}
		</>
	);
}
