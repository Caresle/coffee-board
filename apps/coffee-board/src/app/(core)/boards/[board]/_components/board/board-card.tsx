import React from "react"
import BoardHeader from "./board-header"
import TaskCard from "../task/task-card"

export default function BoardCard() {
	return (
		<div className="border p-2 bg-white rounded-lg flex flex-col gap-2 overflow-y-auto w-[300px] dark:bg-neutral-800">
			<BoardHeader />

			<div className="flex flex-col gap-2 overflow-y-auto flex-1 bg-slate-100 p-2 rounded-lg dark:bg-neutral-900">
				{Array(5)
					.fill(0)
					.map((_, i) => (
						<TaskCard key={i} />
					))}
			</div>
		</div>
	)
}
