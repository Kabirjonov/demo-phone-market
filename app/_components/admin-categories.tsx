"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
	FolderTree,
	Loader2,
	Pencil,
	Plus,
	Search,
	Tag,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import {
	CategoryMutationInput,
	useCategories,
	useCreateCategory,
	useRemoveCategory,
	useUpdateCategory,
} from "@/hooks/useCategories";
import { slugifyProduct } from "@/lib/slugify";
import { ICategory } from "@/type";

type CategoryFormState = {
	name: string;
	slug: string;
	parentId: string;
	imagesText: string;
};

const emptyForm: CategoryFormState = {
	name: "",
	slug: "",
	parentId: "null",
	imagesText: "",
};

function normalizeFormToInput(form: CategoryFormState): CategoryMutationInput {
	const trimmedName = form.name.trim();
	const trimmedSlug = form.slug.trim();
	const images = form.imagesText
		.split("\n")
		.map(item => item.trim())
		.filter(Boolean);

	return {
		name: trimmedName,
		slug: trimmedSlug || slugifyProduct(trimmedName),
		parent_id: form.parentId === "null" ? null : Number(form.parentId),
		images,
	};
}

export default function AdminCategoriesPage() {
	const [search, setSearch] = useState("");
	const [form, setForm] = useState<CategoryFormState>(emptyForm);
	const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);

	const { categories, loading, error } = useCategories();
	const { createCategory, loading: createLoading } = useCreateCategory();
	const { updateCategory, loading: updateLoading } = useUpdateCategory();
	const { removeCategory, loading: removeLoading } = useRemoveCategory();
	const rootCategories = useMemo(
		() => categories.filter(category => category.parent_id == null),
		[categories],
	);

	const filteredCategories = useMemo(() => {
		const q = search.toLowerCase().trim();
		if (!q) {
			return categories;
		}

		return categories.filter(category =>
			[
				category.name,
				category.slug,
				String(category.id),
				category.parent_id == null ? "root" : String(category.parent_id),
			]
				.join(" ")
				.toLowerCase()
				.includes(q),
		);
	}, [categories, search]);

	function resetForm() {
		setEditingCategory(null);
		setForm(emptyForm);
	}

	function fillForm(category: ICategory) {
		setEditingCategory(category);
		setForm({
			name: category.name,
			slug: category.slug,
			parentId:
				category.parent_id == null ? "null" : String(category.parent_id),
			imagesText: (category.images ?? []).join("\n"),
		});
	}

	async function handleSubmit() {
		const input = normalizeFormToInput(form);

		if (!input.name || !input.slug) {
			toast.error("Kategoriya nomi va slug kiritilishi kerak");
			return;
		}

		if (editingCategory) {
			await updateCategory(editingCategory.id, input);
			resetForm();
			return;
		}

		await createCategory(input);
		resetForm();
	}

	async function handleDelete(id: number) {
		await removeCategory(id);

		if (editingCategory?.id === id) {
			resetForm();
		}
	}

	const isSaving = createLoading || updateLoading;

	return (
		<section className='mx-auto max-w-[90%] px-4 pb-12 pt-8 sm:px-6 lg:px-8'>
			<div className='mb-8 flex flex-col gap-4'>
				<div className='inline-flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm'>
					<FolderTree className='h-4 w-4' />
					Category manager
				</div>

				<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
							Admin categories
						</h1>
						<p className='mt-2 max-w-3xl text-sm text-muted-foreground md:text-base'>
							Kategoriyalarni qo&apos;shish, yangilash va o&apos;chirish shu
							sahifada boshqariladi.
						</p>
					</div>

					<div className='flex flex-wrap gap-3'>
						<Button asChild variant='outline' className='rounded-2xl'>
							<Link href='/admin'>Products</Link>
						</Button>
						<Button asChild variant='outline' className='rounded-2xl'>
							<Link href='/admin/orders'>Orders</Link>
						</Button>
						<Button variant='outline' onClick={resetForm} className='rounded-2xl'>
							New form
						</Button>
					</div>
				</div>
			</div>

			<div className='mb-8 grid gap-4 md:grid-cols-3'>
				<StatCard
					title='Total categories'
					value={String(categories.length)}
					icon={<FolderTree className='h-5 w-5' />}
				/>
				<StatCard
					title='Visible results'
					value={String(filteredCategories.length)}
					icon={<Search className='h-5 w-5' />}
				/>
				<StatCard
					title='Editing'
					value={editingCategory ? editingCategory.name : "No"}
					icon={<Tag className='h-5 w-5' />}
				/>
			</div>

			<div className='grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]'>
				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{editingCategory ? "Edit category" : "Create category"}
						</CardTitle>
					</CardHeader>

					<CardContent className='space-y-6'>
						<FieldWrap label='Category name'>
							<Input
								value={form.name}
								onChange={e =>
									setForm(prev => {
										const nextName = e.target.value;
										const shouldUpdateSlug =
											!prev.slug || prev.slug === slugifyProduct(prev.name);

										return {
											...prev,
											name: nextName,
											slug: shouldUpdateSlug
												? slugifyProduct(nextName)
												: prev.slug,
										};
									})
								}
								placeholder='Smartfonlar'
							/>
						</FieldWrap>

						<FieldWrap label='Slug'>
							<Input
								value={form.slug}
								onChange={e =>
									setForm(prev => ({ ...prev, slug: e.target.value }))
								}
								placeholder='smartfonlar'
							/>
						</FieldWrap>

						<FieldWrap label='Parent category'>
							<Select
								value={form.parentId}
								onValueChange={value =>
									setForm(prev => ({ ...prev, parentId: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Asosiy kategoriya' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='null'>Asosiy kategoriya</SelectItem>
									{rootCategories
										.filter(category => category.id !== editingCategory?.id)
										.map(category => (
											<SelectItem
												key={category.id}
												value={String(category.id)}
											>
												{category.name}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</FieldWrap>

						<FieldWrap label='Images'>
							<Textarea
								value={form.imagesText}
								onChange={e =>
									setForm(prev => ({
										...prev,
										imagesText: e.target.value,
									}))
								}
								placeholder={"https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg"}
								rows={4}
							/>
						</FieldWrap>

						<div className='flex gap-3'>
							<Button
								onClick={handleSubmit}
								disabled={isSaving}
								className='flex-1 rounded-2xl'
							>
								{isSaving ? (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								) : (
									<Plus className='mr-2 h-4 w-4' />
								)}
								{editingCategory ? "Save changes" : "Add category"}
							</Button>

							<Button
								variant='outline'
								onClick={resetForm}
								className='flex-1 rounded-2xl'
							>
								Clear
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader className='gap-4'>
						<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
							<CardTitle className='text-2xl'>Categories list</CardTitle>

							<div className='relative w-full lg:max-w-sm'>
								<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									className='pl-9'
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder='Search by name, slug or ID'
								/>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						{loading ? (
							<div className='flex min-h-[300px] items-center justify-center text-muted-foreground'>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								Loading categories...
							</div>
						) : error ? (
							<div className='flex min-h-[300px] items-center justify-center text-destructive'>
								Categories could not be loaded.
							</div>
						) : (
							<div className='overflow-hidden rounded-2xl border'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Name</TableHead>
											<TableHead>Slug</TableHead>
											<TableHead>Parent</TableHead>
											<TableHead className='text-right'>Action</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredCategories.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={5}
													className='h-28 text-center text-muted-foreground'
												>
													No categories found.
												</TableCell>
											</TableRow>
										) : (
											filteredCategories.map(category => (
												<TableRow key={category.id}>
													<TableCell>{category.id}</TableCell>
													<TableCell className='font-medium'>
														{category.name}
													</TableCell>
													<TableCell>{category.slug}</TableCell>
													<TableCell>
														{category.parent_id == null
															? "Root"
															: categories.find(
																	item => item.id === category.parent_id,
																)?.name ?? category.parent_id}
													</TableCell>
													<TableCell>
														<div className='flex justify-end gap-2'>
															<Button
																size='icon'
																variant='outline'
																onClick={() => fillForm(category)}
															>
																<Pencil className='h-4 w-4' />
															</Button>
															<Button
																size='icon'
																variant='destructive'
																onClick={() => handleDelete(category.id)}
																disabled={removeLoading}
															>
																<Trash2 className='h-4 w-4' />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))
										)}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function FieldWrap({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className='space-y-2'>
			<Label>{label}</Label>
			{children}
		</div>
	);
}

function StatCard({
	title,
	value,
	icon,
}: {
	title: string;
	value: string;
	icon: React.ReactNode;
}) {
	return (
		<Card className='rounded-3xl border shadow-sm'>
			<CardContent className='flex items-center justify-between p-6'>
				<div>
					<p className='text-sm text-muted-foreground'>{title}</p>
					<p className='mt-2 text-2xl font-bold tracking-tight'>{value}</p>
				</div>
				<div className='rounded-2xl border bg-muted/40 p-3'>{icon}</div>
			</CardContent>
		</Card>
	);
}
