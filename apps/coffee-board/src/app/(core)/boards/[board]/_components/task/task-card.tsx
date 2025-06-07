import { Separator } from "@/components/ui/separator"
import React from "react"
import TaskHeader from "./task-header"
import TaskAssigned from "./task-assigned"
import TaskMetaInfoCard from "./task-meta-info-card"
import TaskTagList from "./task-tag-list"
import TaskPriority from "./task-priority"

export default function TaskCard() {
	return (
		<div className="flex gap-1 border rounded-lg p-2 bg-white flex-col transition-all ring-0 ring-orange-500 hover:ring-2 dark:bg-neutral-800">
			<TaskHeader />
			<Separator />
			<TaskAssigned />

			<TaskPriority />
			<TaskTagList />
			<TaskMetaInfoCard />
		</div>
	)
}
