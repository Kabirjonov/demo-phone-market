// store/useAuthFlow.store.ts
import { create } from "zustand";

type AuthStep = "login" | "register" | "verify";

type AuthFlowStore = {
	step: AuthStep;
	phone: string;
	setStep: (step: AuthStep) => void;
	setPhone: (phone: string) => void;
	resetFlow: () => void;
};

export const useAuthFlowStore = create<AuthFlowStore>(set => ({
	step: "login",
	phone: "",
	setStep: step => set({ step }),
	setPhone: phone => set({ phone }),
	resetFlow: () => set({ step: "login", phone: "" }),
}));
