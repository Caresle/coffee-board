import { create } from "zustand"

interface ProjectState {
	show: boolean
	update: (data: Partial<ProjectState>) => void
}

export const useProjectStore = create<ProjectState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
