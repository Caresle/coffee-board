import { Task } from "@/entities/task.entity"
import { create } from "zustand"

interface TaskDeleteState {
	show: boolean
	item: Task
	update: (data: Partial<TaskDeleteState>) => void
}

export const useDeleteTaskStore = create<TaskDeleteState>(set => ({
	show: false,
	item: {} as Task,
	update: data => set({ ...data }),
}))
