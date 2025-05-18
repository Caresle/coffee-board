import { create } from "zustand"

interface PriorityState {
	show: boolean
	isEdit: boolean
	update: (data: Partial<PriorityState>) => void
}

export const usePriorityStore = create<PriorityState>(set => ({
	show: false,
	isEdit: false,
	update: data => set({ ...data }),
}))
