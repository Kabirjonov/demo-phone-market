import { create } from "zustand";
type AuthStore = {
	step: "login" | "register" | "verify";
	setStep: (step: "login" | "register" | "verify") => void;
	phone: string;
	setPhone: (phone: string) => void;
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
	step: "login",
	setStep: step => set({ step }),
	phone: "",
	setPhone: phone => set({ phone }),
	isAuth: false,
	setIsAuth: isAuth => set({ isAuth }),
}));
