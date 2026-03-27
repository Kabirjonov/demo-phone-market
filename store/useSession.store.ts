// store/useSession.store.ts
import { IUser } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SessionStore = {
	user: IUser | null;
	isAuth: boolean;
	setUser: (user: IUser | null) => void;
	logout: () => void;
};

export const useSessionStore = create<SessionStore>()(
	persist(
		set => ({
			user: null,
			isAuth: false,
			setUser: user =>
				set({
					user,
					isAuth: !!user,
				}),
			logout: () => {
				localStorage.removeItem("accessToken");
				set({
					user: null,
					isAuth: false,
				});
			},
		}),
		{
			name: "session-storage",
		},
	),
);
