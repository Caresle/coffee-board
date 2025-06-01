import React from "react"
import BoardHeader from "./board-header"
import TaskCard from "../task/task-card"
import Icons from "@/components/shared/icons"

export default function BoardCard() {
	return (
		<div className="border p-2 bg-white rounded-lg flex flex-col gap-2 overflow-y-auto w-[300px] dark:bg-neutral-800">
			<BoardHeader />

			<div className="flex flex-col gap-2 overflow-y-auto flex-1 bg-slate-100 p-2 rounded-lg dark:bg-neutral-900">
				<div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-neutral-500">
					<Icons.Misc.Books className="size-24" />
					<p>No Tasks</p>
				</div>
				{/* {Array(5)
					.fill(0)
					.map((_, i) => (
						<TaskCard key={i} />
					))} */}
			</div>
		</div>
	)
}
