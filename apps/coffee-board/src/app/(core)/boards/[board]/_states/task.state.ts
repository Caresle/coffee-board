import { Task } from "@/entities/task.entity"
import { create } from "zustand"

interface TaskState {
	show: boolean
	item: Task
	update: (data: Partial<TaskState>) => void
}

export const useTaskStore = create<TaskState>(set => ({
	show: false,
	item: {} as Task,
	update: data => set({ ...data }),
}))
