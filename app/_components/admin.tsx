"use client";

import { useMutation, useQuery } from "@apollo/client/react";

import {
	AlertCircle,
	Loader2,
	Package2,
	Pencil,
	Plus,
	Search,
	Trash2,
	Boxes,
	BadgeDollarSign,
	Layers3,
	ScanBarcode,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	ICategory,
	IProduct,
	IProductFormState,
	IProductSpecification,
} from "@/type";
import {
	CREATE_PRODUCT,
	GET_CATEGORIES,
	GET_PRODUCTS,
	REMOVE_PRODUCT,
	UPDATE_PRODUCT,
} from "@/hooks/useProducts";

const emptySpecification: IProductSpecification = {
	label: "",
	value: "",
	group: "Asosiy",
};

const emptyForm: IProductFormState = {
	title: "",
	price: "",
	// slug: "",
	brand: "",
	categoryId: "",
	code: "",
	stock: "0",
	shortDescription: "",
	description: "",
	imagesText: "",
	specifications: [emptySpecification],
};

function formatPrice(value: number) {
	return new Intl.NumberFormat("uz-UZ").format(value);
}

function normalizeFormToInput(form: IProductFormState) {
	return {
		title: form.title.trim(),
		price: Number(form.price || 0),
		// slug: form.slug.trim() || slugify(form.title),
		brand: form.brand.trim(),
		categoryId: Number(form.categoryId),
		code: form.code.trim(),
		stock: Number(form.stock || 0),
		shortDescription: form.shortDescription.trim() || null,
		description: form.description.trim(),
		images: form.imagesText
			.split("\n")
			.map(item => item.trim())
			.filter(Boolean),
		specifications: form.specifications
			.map(item => ({
				label: item.label.trim(),
				value: item.value.trim(),
				group: item.group?.trim() || "Asosiy",
			}))
			.filter(item => item.label && item.value),
	};
}

export default function AdminProductsPage() {
	const [search, setSearch] = useState("");
	const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
	const [form, setForm] = useState<IProductFormState>(emptyForm);

	const {
		data: productsData,
		loading: productsLoading,
		error: productsError,
		refetch: refetchProducts,
	} = useQuery(GET_PRODUCTS);

	const { data: categoriesData } = useQuery(GET_CATEGORIES);

	const [createProduct, { loading: createLoading }] = useMutation(
		CREATE_PRODUCT,
		{
			onCompleted: () => {
				resetForm();
				refetchProducts();
			},
		},
	);

	const [updateProduct, { loading: updateLoading }] = useMutation(
		UPDATE_PRODUCT,
		{
			onCompleted: () => {
				resetForm();
				refetchProducts();
			},
		},
	);

	const [removeProduct, { loading: removeLoading }] = useMutation(
		REMOVE_PRODUCT,
		{
			onCompleted: () => {
				refetchProducts();
			},
		},
	);
	// @ts-ignore
	const products: IProduct[] = productsData?.products ?? [];
	// @ts-ignore

	const categories: ICategory[] = categoriesData?.categories ?? [];

	const filteredProducts = useMemo(() => {
		const q = search.toLowerCase().trim();
		if (!q) return products;

		return products.filter(product =>
			[
				product.title,
				product.brand,
				product.category?.name,
				product.code,
				product.slug,
			]
				.join(" ")
				.toLowerCase()
				.includes(q),
		);
	}, [products, search]);

	const stats = useMemo(() => {
		const total = products.length;
		const totalStock = products.reduce(
			(sum, item) => sum + (item.stock || 0),
			0,
		);
		const totalValue = products.reduce(
			// @ts-ignore

			(sum, item) => sum + (item.price || 0) * (item.stock || 0),
			0,
		);
		const lowStock = products.filter(
			item => item.stock > 0 && item.stock <= 5,
		).length;

		return { total, totalStock, totalValue, lowStock };
	}, [products]);

	// useEffect(() => {
	// 	if (!form.slug && form.title) {
	// 		setForm(prev => ({ ...prev, slug: slugify(prev.title) }));
	// 	}
	// }, [form.title, form.slug]);

	function resetForm() {
		setEditingProduct(null);
		setForm(emptyForm);
	}

	function fillForm(product: IProduct) {
		setEditingProduct(product);
		setForm({
			title: product.title,
			price: String(product.price ?? ""),
			// slug: product.slug,
			brand: product.brand,
			categoryId: String(product.category?.id ?? ""),
			code: product.code,
			stock: String(product.stock ?? 0),
			shortDescription: product.shortDescription ?? "",
			description: product.description ?? "",
			imagesText: (product.images ?? []).join("\n"),
			specifications:
				product.specifications && product.specifications.length > 0
					? product.specifications
					: [emptySpecification],
		});
	}

	function updateSpec(
		index: number,
		key: keyof IProductSpecification,
		value: string,
	) {
		setForm(prev => ({
			...prev,
			specifications: prev.specifications.map((spec, i) =>
				i === index ? { ...spec, [key]: value } : spec,
			),
		}));
	}

	function addSpecRow() {
		setForm(prev => ({
			...prev,
			specifications: [...prev.specifications, { ...emptySpecification }],
		}));
	}

	function removeSpecRow(index: number) {
		setForm(prev => ({
			...prev,
			specifications:
				prev.specifications.length === 1
					? [{ ...emptySpecification }]
					: prev.specifications.filter((_, i) => i !== index),
		}));
	}

	async function handleSubmit() {
		const input = normalizeFormToInput(form);

		if (
			!input.title ||
			!input.brand ||
			!input.code ||
			!input.description ||
			!input.categoryId
		) {
			return;
		}

		if (editingProduct) {
			await updateProduct({
				variables: {
					id: editingProduct.id,
					input,
				},
			});
			return;
		}

		await createProduct({
			variables: {
				input,
			},
		});
	}

	async function handleDelete(id: number) {
		await removeProduct({ variables: { id } });
		if (editingProduct?.id === id) resetForm();
	}

	const isSaving = createLoading || updateLoading;

	return (
		<section className='mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8'>
			<div className='mb-8 flex flex-col gap-4'>
				<div className='inline-flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm'>
					<Package2 className='h-4 w-4' />
					Tech market admin
				</div>

				<div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight md:text-4xl'>
							Admin Panel
						</h1>
						<p className='mt-2 max-w-3xl text-sm text-muted-foreground md:text-base'>
							Product create, update, delete va specifications boshqaruvi bitta
							sahifada.
						</p>
					</div>

					<Button variant='outline' onClick={resetForm} className='rounded-2xl'>
						Yangi forma
					</Button>
				</div>
			</div>

			<div className='mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
				<StatCard
					title='Jami product'
					value={String(stats.total)}
					icon={<Boxes className='h-5 w-5' />}
				/>
				<StatCard
					title='Jami stock'
					value={String(stats.totalStock)}
					icon={<Layers3 className='h-5 w-5' />}
				/>
				<StatCard
					title='Ombor qiymati'
					value={`${formatPrice(stats.totalValue)} so'm`}
					icon={<BadgeDollarSign className='h-5 w-5' />}
				/>
				<StatCard
					title='Kam qolganlar'
					value={String(stats.lowStock)}
					icon={<AlertCircle className='h-5 w-5' />}
				/>
			</div>

			<div className='grid gap-6 xl:grid-cols-[460px_minmax(0,1fr)]'>
				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{editingProduct ? "Product update" : "Yangi product"}
						</CardTitle>
					</CardHeader>

					<CardContent className='space-y-6'>
						<div className='grid gap-4 sm:grid-cols-2'>
							<FieldWrap label='Product nomi'>
								<Input
									value={form.title}
									onChange={e =>
										setForm(prev => ({ ...prev, title: e.target.value }))
									}
									placeholder='Masalan, iPhone 15 Pro'
								/>
							</FieldWrap>

							<FieldWrap label='Brand'>
								<Input
									value={form.brand}
									onChange={e =>
										setForm(prev => ({ ...prev, brand: e.target.value }))
									}
									placeholder='Apple'
								/>
							</FieldWrap>
							{/* 
							<FieldWrap label='Slug'>
								<Input
									value={form.slug}
									onChange={e =>
										setForm(prev => ({ ...prev, slug: e.target.value }))
									}
									placeholder='iphone-15-pro'
								/>
							</FieldWrap> */}

							<FieldWrap label='Code / SKU'>
								<Input
									value={form.code}
									onChange={e =>
										setForm(prev => ({ ...prev, code: e.target.value }))
									}
									placeholder='APL-IP15PRO'
								/>
							</FieldWrap>

							<FieldWrap label='Narx'>
								<Input
									type='number'
									value={form.price}
									onChange={e =>
										setForm(prev => ({ ...prev, price: e.target.value }))
									}
									placeholder='22000000'
								/>
							</FieldWrap>

							<FieldWrap label='Stock'>
								<Input
									type='number'
									value={form.stock}
									onChange={e =>
										setForm(prev => ({ ...prev, stock: e.target.value }))
									}
									placeholder='12'
								/>
							</FieldWrap>
						</div>

						<FieldWrap label='Category'>
							<Select
								value={form.categoryId}
								onValueChange={value =>
									setForm(prev => ({ ...prev, categoryId: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Category tanlang' />
								</SelectTrigger>
								<SelectContent>
									{categories.map(category => (
										<SelectItem key={category.id} value={String(category.id)}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FieldWrap>

						<FieldWrap label='Qisqa tavsif'>
							<Textarea
								value={form.shortDescription}
								onChange={e =>
									setForm(prev => ({
										...prev,
										shortDescription: e.target.value,
									}))
								}
								placeholder='Kartochka uchun qisqa description'
								className='min-h-[90px]'
							/>
						</FieldWrap>

						<FieldWrap label="To'liq tavsif">
							<Textarea
								value={form.description}
								onChange={e =>
									setForm(prev => ({ ...prev, description: e.target.value }))
								}
								placeholder="Product haqida to'liq ma'lumot"
								className='min-h-[140px]'
							/>
						</FieldWrap>

						<FieldWrap label='Rasm URL lar (har qatorga 1 ta)'>
							<Textarea
								value={form.imagesText}
								onChange={e =>
									setForm(prev => ({ ...prev, imagesText: e.target.value }))
								}
								placeholder={"https://site.com/1.jpg\nhttps://site.com/2.jpg"}
								className='min-h-[120px]'
							/>
						</FieldWrap>

						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div>
									<h3 className='text-base font-semibold'>Specifications</h3>
									<p className='text-sm text-muted-foreground'>
										Dynamic spec qo'shing: RAM, SSD, protsessor va hokazo.
									</p>
								</div>
								<Button type='button' variant='outline' onClick={addSpecRow}>
									<Plus className='mr-2 h-4 w-4' />
									Spec qo'shish
								</Button>
							</div>

							<ScrollArea className='max-h-[320px] rounded-2xl border'>
								<div className='space-y-3 p-4'>
									{form.specifications.map((spec, index) => (
										<div
											key={index}
											className='rounded-2xl border bg-muted/30 p-3'
										>
											<div className='mb-3 flex items-center justify-between'>
												<span className='text-sm font-medium'>
													Spec #{index + 1}
												</span>
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() => removeSpecRow(index)}
												>
													<Trash2 className='h-4 w-4' />
												</Button>
											</div>

											<div className='grid gap-3 md:grid-cols-3'>
												<Input
													placeholder='Group'
													value={spec.group ?? ""}
													onChange={e =>
														updateSpec(index, "group", e.target.value)
													}
												/>
												<Input
													placeholder='Label'
													value={spec.label}
													onChange={e =>
														updateSpec(index, "label", e.target.value)
													}
												/>
												<Input
													placeholder='Value'
													value={spec.value}
													onChange={e =>
														updateSpec(index, "value", e.target.value)
													}
												/>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>

						<Separator />

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
								{editingProduct ? "O'zgarishni saqlash" : "Product qo'shish"}
							</Button>

							<Button
								variant='outline'
								onClick={resetForm}
								className='flex-1 rounded-2xl'
							>
								Tozalash
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className='rounded-3xl border shadow-sm'>
					<CardHeader className='gap-4'>
						<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
							<CardTitle className='text-2xl'>Product ro'yxati</CardTitle>

							<div className='relative w-full lg:max-w-sm'>
								<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
								<Input
									className='pl-9'
									value={search}
									onChange={e => setSearch(e.target.value)}
									placeholder="Nomi, brand, code bo'yicha qidirish"
								/>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						{productsLoading ? (
							<div className='flex min-h-[300px] items-center justify-center text-muted-foreground'>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								Yuklanmoqda...
							</div>
						) : productsError ? (
							<div className='flex min-h-[300px] items-center justify-center text-destructive'>
								Productlarni olishda xatolik yuz berdi.
							</div>
						) : (
							<div className='overflow-hidden rounded-2xl border'>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nomi</TableHead>
											<TableHead>Brand</TableHead>
											<TableHead>Category</TableHead>
											<TableHead>Narx</TableHead>
											<TableHead>Stock</TableHead>
											<TableHead>Specs</TableHead>
											<TableHead className='text-right'>Action</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredProducts.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={7}
													className='h-28 text-center text-muted-foreground'
												>
													Hech qanday product topilmadi.
												</TableCell>
											</TableRow>
										) : (
											filteredProducts.map(product => (
												<TableRow key={product.id}>
													<TableCell className='min-w-[250px]'>
														<div className='font-medium'>{product.title}</div>
														<div className='mt-1 flex items-center gap-2 text-xs text-muted-foreground'>
															<ScanBarcode className='h-3.5 w-3.5' />
															{product.code}
														</div>
													</TableCell>
													<TableCell>{product.brand}</TableCell>
													<TableCell>{product.category?.name ?? "-"}</TableCell>
													<TableCell>
														{formatPrice(product.price)} so'm
													</TableCell>
													<TableCell>
														<Badge
															variant={
																product.stock > 0 ? "secondary" : "destructive"
															}
														>
															{product.stock}
														</Badge>
													</TableCell>
													<TableCell>
														{product.specifications?.length ?? 0} ta
													</TableCell>
													<TableCell>
														<div className='flex justify-end gap-2'>
															<Button
																size='icon'
																variant='outline'
																onClick={() => fillForm(product)}
															>
																<Pencil className='h-4 w-4' />
															</Button>
															<Button
																size='icon'
																variant='destructive'
																onClick={() => handleDelete(product.id)}
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
