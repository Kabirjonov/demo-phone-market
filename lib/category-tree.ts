import { ICategory } from "@/type";

export type CatalogCategoryTreeItem = {
	id: number;
	name: string;
	slug: string;
	images: string[];
	parent_id: number | null;
	items: ICategory[];
};

function normalizeImages(images?: string[]) {
	return (images ?? []).filter(Boolean);
}

export function buildCategoryTree(
	categories: ICategory[],
): CatalogCategoryTreeItem[] {
	const childrenByParentId = new Map<number, ICategory[]>();

	for (const category of categories) {
		if (category.parent_id == null) {
			continue;
		}

		const items = childrenByParentId.get(category.parent_id) ?? [];
		items.push(category);
		childrenByParentId.set(category.parent_id, items);
	}

	return categories
		.filter(category => category.parent_id == null)
		.map(category => {
			const items = childrenByParentId.get(category.id) ?? [];

			return {
				id: category.id,
				name: category.name,
				slug: category.slug,
				images: normalizeImages(category.images).length
					? normalizeImages(category.images)
					: normalizeImages(items[0]?.images),
				parent_id: null,
				items,
			};
		});
}

export function findCategoryBySlug(
	categories: ICategory[],
	slug: string,
): ICategory | null {
	return categories.find(category => category.slug === slug) ?? null;
}

export function getCategoryBranchIds(
	categories: ICategory[],
	categoryId: number,
): number[] {
	const childrenByParentId = new Map<number, ICategory[]>();

	for (const category of categories) {
		if (category.parent_id == null) {
			continue;
		}

		const items = childrenByParentId.get(category.parent_id) ?? [];
		items.push(category);
		childrenByParentId.set(category.parent_id, items);
	}

	const visited = new Set<number>();
	const queue = [categoryId];

	while (queue.length > 0) {
		const currentId = queue.shift();
		if (currentId == null || visited.has(currentId)) {
			continue;
		}

		visited.add(currentId);

		for (const child of childrenByParentId.get(currentId) ?? []) {
			queue.push(child.id);
		}
	}

	return [...visited];
}
