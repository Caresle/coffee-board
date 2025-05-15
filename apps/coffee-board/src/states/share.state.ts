import { create } from "zustand"

interface ShareState {
	show: boolean
	update: (data: Partial<ShareState>) => void
}

export const useShareStore = create<ShareState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
