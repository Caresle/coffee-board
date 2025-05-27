import React from "react"
import { usePriority } from "../_hook/use-priority"
import PriorityItem from "./priority-item"
import Icons from "@/components/shared/icons"

export default function PriorityList() {
	const { priorities, QPriority } = usePriority()

	const loading = QPriority.isLoading || QPriority.isFetching

	return (
		<div className="flex-1 rounded-lg p-2 border bg-slate-100 flex flex-col gap-2 overflow-y-auto dark:bg-neutral-900">
			{!loading && priorities.length === 0 && (
				<div className="flex flex-col items-center justify-center gap-2 flex-1 dark:text-neutral-500 transition-all animate-pulse">
					<Icons.Misc.NoData className="size-32" />
					<div className="font-semibold text-2xl">No priorities found.</div>
				</div>
			)}
			{!loading &&
				priorities.length > 0 &&
				priorities.map((priority, index) => (
					<PriorityItem key={index} priority={priority} />
				))}
		</div>
	)
}
