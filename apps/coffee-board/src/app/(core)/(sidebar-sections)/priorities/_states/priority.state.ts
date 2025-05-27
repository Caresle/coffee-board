import { Priority } from "@/entities/priority.entity"
import { create } from "zustand"

interface PriorityState {
	show: boolean
	isEdit: boolean
	item: Priority
	update: (data: Partial<PriorityState>) => void
}

export const usePriorityStore = create<PriorityState>(set => ({
	show: false,
	isEdit: false,
	item: {} as Priority,
	update: data => set({ ...data }),
}))
