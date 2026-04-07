"use client";

import { useAuthFlowStore } from "@/store/useAuth.store";
import ForgotPasswordForm from "../../_components/forgot-password.form";
import LoginForm from "../../_components/login.form";
import RegisterForm from "../../_components/register.form";
import VerifyForm from "../../_components/verify.form";

export default function StateAuth() {
	const step = useAuthFlowStore(state => state.step);
	return (
		<>
			{step == "login" && <LoginForm />}
			{step == "register" && <RegisterForm />}
			{step == "verify" && <VerifyForm />}
			{(step == "forgotPassword" || step == "resetPassword") && (
				<ForgotPasswordForm />
			)}
		</>
	);
}
