"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Loader2, Search, Shield, Trash2, UserCog, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRemoveUser, useUpdateUser, useUsers } from "@/hooks/useUsers";
import { canManageUsers } from "@/lib/roles";
import { useSessionStore } from "@/store/useSession.store";
import NotFound from "@/app/not-found";

const roleOptions = ["user", "admin", "superadmin"] as const;

type PendingRoleChange = {
	id: number;
	name: string;
	nextRole: string;
	currentRole: string;
} | null;

type PendingDelete = {
	id: number;
	name: string;
	role: string;
} | null;

export default function AdminUsersPage() {
	const router = useRouter();
	const user = useSessionStore(state => state.user);
	const isAuth = useSessionStore(state => state.isAuth);
	const [search, setSearch] = useState("");
	const [pendingRoleChange, setPendingRoleChange] =
		useState<PendingRoleChange>(null);
	const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);
	const { users, loading, error } = useUsers();
	const { updateUser, loading: updateLoading } = useUpdateUser();
	const { removeUser, loading: removeLoading } = useRemoveUser();

	useEffect(() => {
		if (!isAuth) {
			router.replace("/auth");
			return;
		}

		if (!canManageUsers(user)) {
			// router.replace("/");
			NotFound();
		}
	}, [isAuth, router, user]);

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase();

		if (!query) {
			return users;
		}

		return users.filter(item =>
			[item.name, item.phone, item.role, item.verifyCode, String(item.id)]
				.join(" ")
				.toLowerCase()
				.includes(query),
		);
	}, [search, users]);

	const stats = useMemo(
		() => ({
			total: users.length,
			admins: users.filter(item => item.role === "admin").length,
			superAdmins: users.filter(item => item.role === "superadmin").length,
			verified: users.filter(item => item.isVerified).length,
		}),
		[users],
	);

	async function handleRoleChange(id: number, role: string) {
		await updateUser(id, { role });
	}

	async function handleDelete(targetId: number) {
		await removeUser(targetId);
	}

	async function confirmRoleChange() {
		if (!pendingRoleChange) {
			return;
		}

		await handleRoleChange(pendingRoleChange.id, pendingRoleChange.nextRole);
		setPendingRoleChange(null);
	}

	async function confirmDelete() {
		if (!pendingDelete) {
			return;
		}

		await handleDelete(pendingDelete.id);
		setPendingDelete(null);
	}

	if (!isAuth || !canManageUsers(user)) {
		return <div>Tekshirilmoqda...</div>;
	}

	return (
		<>
			<section className='mx-auto max-w-[90%] px-4 pb-12 pt-8 sm:px-6 lg:px-8'>
				<div className='mb-8 flex flex-col gap-4'>
					<div className='inline-flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm'>
						<Shield className='h-4 w-4' />
						Superadmin panel
					</div>

					<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
						<div>
							<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
								Users management
							</h1>
							<p className='mt-2 max-w-3xl text-sm text-muted-foreground md:text-base'>
								Superadmin foydalanuvchilar va adminlarni ko&apos;rishi, rolini
								o&apos;zgartirishi va o&apos;chirishi mumkin.
							</p>
						</div>

						<div className='flex flex-wrap gap-3'>
							<Button asChild variant='outline' className='rounded-2xl'>
								<Link href='/admin'>Products</Link>
							</Button>
							<Button asChild variant='outline' className='rounded-2xl'>
								<Link href='/admin/categories'>Categories</Link>
							</Button>
							<Button asChild variant='outline' className='rounded-2xl'>
								<Link href='/admin/orders'>Orders</Link>
							</Button>
						</div>
					</div>
				</div>

				<div className='mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
					<StatCard
						title='Total users'
						value={String(stats.total)}
						icon={<Users className='h-5 w-5' />}
					/>
					<StatCard
						title='Admins'
						value={String(stats.admins)}
						icon={<UserCog className='h-5 w-5' />}
					/>
					<StatCard
						title='Superadmins'
						value={String(stats.superAdmins)}
						icon={<Shield className='h-5 w-5' />}
					/>
					<StatCard
						title='Verified'
						value={String(stats.verified)}
						icon={<Users className='h-5 w-5' />}
					/>
				</div>

				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader className='gap-4'>
						<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
							<CardTitle className='text-2xl'>Users list</CardTitle>

							<div className='relative w-full lg:max-w-sm'>
								<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									className='pl-9'
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder='Search by name, phone, role or ID'
								/>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						{loading ? (
							<div className='flex min-h-[320px] items-center justify-center text-muted-foreground'>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								Loading users...
							</div>
						) : error ? (
							<div className='flex min-h-[320px] items-center justify-center text-center text-destructive'>
								Users could not be loaded.
							</div>
						) : (
							<div className='overflow-hidden rounded-2xl border'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Name</TableHead>
											<TableHead>Phone</TableHead>
											<TableHead>Role</TableHead>
											<TableHead>Verified</TableHead>
											<TableHead className='text-right'>Action</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredUsers.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={6}
													className='h-28 text-center text-muted-foreground'
												>
													No users found.
												</TableCell>
											</TableRow>
										) : (
											filteredUsers.map(item => {
												const isCurrentUser = Number(user?.id) === item.id;

												return (
													<TableRow key={item.id}>
														<TableCell>{item.id}</TableCell>
														<TableCell className='font-medium'>
															{item.name}
														</TableCell>
														<TableCell>{item.phone}</TableCell>
														<TableCell className='min-w-[180px]'>
															<Select
																value={item.role}
																onValueChange={value => {
																	if (value === item.role) {
																		return;
																	}

																	setPendingRoleChange({
																		id: item.id,
																		name: item.name,
																		currentRole: item.role,
																		nextRole: value,
																	});
																}}
																disabled={updateLoading || isCurrentUser}
															>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	{roleOptions.map(role => (
																		<SelectItem key={role} value={role}>
																			{role}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
														</TableCell>
														<TableCell>
															{item.isVerified ? "Yes" : item.verifyCode}
														</TableCell>
														<TableCell>
															<div className='flex justify-end gap-2'>
																<Button
																	size='icon'
																	variant='destructive'
																	onClick={() =>
																		setPendingDelete({
																			id: item.id,
																			name: item.name,
																			role: item.role,
																		})
																	}
																	disabled={removeLoading || isCurrentUser}
																	title={
																		isCurrentUser
																			? "You cannot delete yourself"
																			: "Delete user"
																	}
																>
																	<Trash2 className='h-4 w-4' />
																</Button>
															</div>
														</TableCell>
													</TableRow>
												);
											})
										)}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>
			</section>

			<AlertDialog
				open={pendingRoleChange !== null}
				onOpenChange={open => {
					if (!open) {
						setPendingRoleChange(null);
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Role o&apos;zgartirilsinmi?</AlertDialogTitle>
						<AlertDialogDescription>
							{pendingRoleChange
								? `${pendingRoleChange.name} foydalanuvchisi roli ${pendingRoleChange.currentRole} dan ${pendingRoleChange.nextRole} ga o'zgaradi.`
								: ""}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={updateLoading}>
							Bekor qilish
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => void confirmRoleChange()}
							disabled={updateLoading}
						>
							{updateLoading ? "Saqlanmoqda..." : "Tasdiqlash"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<AlertDialog
				open={pendingDelete !== null}
				onOpenChange={open => {
					if (!open) {
						setPendingDelete(null);
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Foydalanuvchi o&apos;chirilsinmi?
						</AlertDialogTitle>
						<AlertDialogDescription>
							{pendingDelete
								? `${pendingDelete.name} (${pendingDelete.role}) foydalanuvchisi tizimdan o'chiriladi. Bu amalni ortga qaytarib bo'lmaydi.`
								: ""}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={removeLoading}>
							Bekor qilish
						</AlertDialogCancel>
						<AlertDialogAction
							className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
							onClick={() => void confirmDelete()}
							disabled={removeLoading}
						>
							{removeLoading ? "O'chirilmoqda..." : "O'chirish"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

function StatCard({
	title,
	value,
	icon,
}: {
	title: string;
	value: string;
	icon: ReactNode;
}) {
	return (
		<Card className='rounded-3xl border shadow-sm'>
			<CardContent className='flex items-center justify-between p-6'>
				<div>
					<p className='text-sm text-muted-foreground'>{title}</p>
					<p className='mt-2 text-2xl font-semibold'>{value}</p>
				</div>
				<div className='rounded-2xl bg-muted p-3 text-foreground'>{icon}</div>
			</CardContent>
		</Card>
	);
}
