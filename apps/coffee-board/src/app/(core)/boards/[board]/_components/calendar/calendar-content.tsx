import { cn } from "@/lib/utils"
import React from "react"

export default function CalendarContent() {
	return (
		<div className="grid grid-cols-12 flex-1 overflow-y-auto">
			<div className="col-span-2 flex flex-col">
				{Array(24)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className={cn("bg-slate-50 flex-1 p-1 dark:bg-neutral-800", {
								"bg-slate-100 dark:bg-neutral-700": i % 2 === 0,
							})}
						>
							{i}
						</div>
					))}
			</div>
			<div className="col-span-10 grid grid-cols-7">
				{Array(168)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className="border transition-all hover:bg-orange-200 cursor-pointer dark:hover:bg-orange-700"
						></div>
					))}
			</div>
		</div>
	)
}
