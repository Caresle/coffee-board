import React from "react"
import { useTask } from "../../_hook/use-task"

export default function TaskTagList() {
	const { task } = useTask()

	if (!task.tags) return <></>
	if (task.tags.length <= 0) return <></>

	const tagsToDisplay = task.tags.slice(0, 2)

	return (
		<div className="flex items-center gap-2">
			{tagsToDisplay.map((tag, index) => (
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
			{task.tags.length > 2 && (
				<div className="px-2 py-1 rounded-lg w-fit text-sm">
					+{task.tags.length - 2}
				</div>
			)}
		</div>
	)
}
