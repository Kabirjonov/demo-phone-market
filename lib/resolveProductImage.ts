import { Base_Url } from "@/http/api";

export function resolveProductImage(image?: string) {
	if (!image) {
		return "/logo.png";
	}

	if (image.startsWith("http://") || image.startsWith("https://")) {
		return image;
	}

	if (image.startsWith("/")) {
		return image;
	}

	return `${Base_Url}/${image}`;
}
