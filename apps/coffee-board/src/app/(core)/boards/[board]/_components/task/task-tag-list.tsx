import React from "react"
import { useTask } from "../../_hook/use-task"

export default function TaskTagList() {
	const { task } = useTask()

	if (!task.tags) return <></>
	if (task.tags.length <= 0) return <></>

	return (
		<div className="flex items-center gap-2">
			{task.tags.map((tag, index) => (
				<div
					key={index}
					className="px-2 py-1 rounded-lg w-fit text-sm text-white"
					style={{
						backgroundColor: tag.color,
					}}
				>
					{tag.name}
				</div>
			))}
		</div>
	)
}
