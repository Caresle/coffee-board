import { create } from "zustand"

interface ArchiveProjectState {
	show: boolean
	update: (data: Partial<ArchiveProjectState>) => void
}

export const useArchiveProjectStore = create<ArchiveProjectState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
