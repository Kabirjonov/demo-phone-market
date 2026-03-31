import { Check, CreditCard } from "lucide-react";

export default function OptionCard({
	active,
	onClick,
	title,
	description,
	icon: Icon,
}: {
	active: boolean;
	onClick: () => void;
	title: string;
	description?: string;
	icon?: typeof CreditCard;
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`relative flex min-h-20 w-full items-center justify-between rounded-[22px] border px-5 py-4 text-left transition ${
				active
					? "border-primary/60 bg-primary/10 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
					: "border-border bg-white hover:border-primary/30"
			}`}
		>
			<div className='space-y-1'>
				<div className='flex items-center gap-3 text-base font-semibold text-foreground'>
					{Icon ? <Icon className='h-5 w-5 text-muted-foreground' /> : null}
					<span>{title}</span>
				</div>
				{description ? (
					<p className='text-sm text-muted-foreground'>{description}</p>
				) : null}
			</div>

			<div
				className={`flex h-7 w-7 items-center justify-center rounded-full border ${
					active
						? "border-primary bg-primary text-primary-foreground"
						: "border-slate-200 bg-slate-100 text-transparent"
				}`}
			>
				<Check className='h-4 w-4' />
			</div>
		</button>
	);
}
