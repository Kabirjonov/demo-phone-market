export function formatPrice(value: number, locale = "uz-UZ") {
	return new Intl.NumberFormat(locale).format(value);
}
