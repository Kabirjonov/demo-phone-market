import { IUser } from "@/type";

export function isAdminRole(role?: string | null) {
	return role === "admin" || role === "superadmin";
}

export function canManageUsers(user?: IUser | null) {
	return user?.role === "superadmin";
}
