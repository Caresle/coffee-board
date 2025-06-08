"use client"

import { Task } from "@/entities/task.entity"
import { createContext, useContext } from "react"

interface ITaskContext {
	task: Task
}

const TaskContext = createContext<ITaskContext>({
	task: {} as Task,
})

export const useTask = () => useContext(TaskContext)

export function TaskProvider({
	task,
	children,
}: {
	task: Task
	children: React.ReactNode
}) {
	const value: ITaskContext = {
		task,
	}

	return <TaskContext value={value}>{children}</TaskContext>
}
