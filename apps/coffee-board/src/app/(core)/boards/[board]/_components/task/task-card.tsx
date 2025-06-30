import { Separator } from "@/components/ui/separator"
import React from "react"
import TaskHeader from "./task-header"
import TaskAssigned from "./task-assigned"
import TaskMetaInfoCard from "./task-meta-info-card"
import TaskTagList from "./task-tag-list"
import TaskPriority from "./task-priority"
import { useDraggable } from "@dnd-kit/core"
import { useTask } from "../../_hook/use-task"
import { cn } from "@/lib/utils"

export default function TaskCard({ disabled }: { disabled?: boolean }) {
	const { task } = useTask()
	const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
		id: task.id,
		data: task,
		disabled,
	})

	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			className={cn(
				"flex gap-1 border rounded-lg p-2 bg-white flex-col transition-all ring-0 ring-orange-500 hover:ring-2 dark:bg-neutral-800",
				{
					"opacity-0": isDragging,
				},
			)}
		>
			<TaskHeader />
			<Separator />
			<TaskAssigned />

			<TaskPriority />
			<TaskTagList />
			<TaskMetaInfoCard />
		</div>
	)
}
