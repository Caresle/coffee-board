import { create } from "zustand"

interface PriorityDeleteState {
	show: boolean
	update: (data: Partial<PriorityDeleteState>) => void
}

export const usePriorityDeleteStore = create<PriorityDeleteState>(set => ({
	show: false,
	update: data => set({ ...data }),
}))
