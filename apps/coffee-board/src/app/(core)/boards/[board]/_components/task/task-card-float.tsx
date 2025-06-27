import { Task } from "@/entities/task.entity"
import React from "react"
import { TaskProvider } from "../../_hook/use-task"
import TaskCard from "./task-card"

export default function TaskCardFloat({ task }: { task: Task }) {
	return (
		<div>
			<TaskProvider task={task}>
				<TaskCard disabled />
			</TaskProvider>
		</div>
	)
}
