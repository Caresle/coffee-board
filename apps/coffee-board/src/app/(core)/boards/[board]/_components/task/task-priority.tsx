import React from "react"
import { useTask } from "../../_hook/use-task"

export default function TaskPriority() {
	const { task } = useTask()

	if (!task.id_priority) return <></>

	return (
		<div className="bg-red-50 w-fit text-red-500 rounded-sm px-2 py-1 text-xs dark:bg-red-950 dark:text-red-100">
			{task.priority.name}
		</div>
	)
}
