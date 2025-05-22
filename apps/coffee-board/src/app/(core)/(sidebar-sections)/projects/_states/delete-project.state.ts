import { create } from "zustand"

interface DeleteProjectState {
	show: boolean
	update: (data: Partial<DeleteProjectState>) => void
}

export const useDeleteProjectStore = create<DeleteProjectState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
