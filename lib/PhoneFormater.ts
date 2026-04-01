export const formatUzPhone = (value: string) => {
	let digits = value.replace(/\D/g, "");

	if (digits.length === 0) {
		return "+998";
	}

	if (!digits.startsWith("998")) {
		digits = "998" + digits;
	}

	digits = digits.slice(0, 12);
	let formatted = "+998";

	if (digits.length > 3) formatted += " " + digits.slice(3, 5);
	if (digits.length > 5) formatted += " " + digits.slice(5, 8);
	if (digits.length > 8) formatted += " " + digits.slice(8, 10);
	if (digits.length > 10) formatted += " " + digits.slice(10, 12);

	return formatted;
};

export const normalizePhone = (phone: string) => {
	const value = phone.replace(/\D/g, ""); // faqat raqamlar

	if (value.startsWith("998")) {
		return `+${value}`;
	}

	if (value.startsWith("0")) {
		return `+998${value.slice(1)}`;
	}

	return `+${value}`;
};
