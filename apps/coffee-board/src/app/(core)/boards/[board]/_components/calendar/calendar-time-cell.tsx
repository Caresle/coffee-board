import { cn } from "@/lib/utils"

export default function CalendarTimeCell({
	children,
	isEven,
}: {
	children: React.ReactNode
	isEven: boolean
}) {
	return (
		<div
			className={cn("bg-slate-50 flex-1 p-1 dark:bg-neutral-800", {
				"bg-slate-100 dark:bg-neutral-700": isEven,
			})}
		>
			{children}
		</div>
	)
}
