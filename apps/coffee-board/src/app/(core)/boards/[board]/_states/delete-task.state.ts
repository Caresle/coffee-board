import { create } from "zustand"

interface TaskDeleteState {
	show: boolean
	update: (data: Partial<TaskDeleteState>) => void
}

export const useDeleteTaskStore = create<TaskDeleteState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
