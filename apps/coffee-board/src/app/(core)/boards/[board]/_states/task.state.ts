import { create } from "zustand"

interface TaskState {
	show: boolean
	update: (data: Partial<TaskState>) => void
}

export const useTaskStore = create<TaskState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
