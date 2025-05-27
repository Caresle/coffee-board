import { Priority } from "@/entities/priority.entity"
import { create } from "zustand"

interface PriorityDeleteState {
	show: boolean
	item: Priority
	update: (data: Partial<PriorityDeleteState>) => void
}

export const usePriorityDeleteStore = create<PriorityDeleteState>(set => ({
	show: false,
	item: {} as Priority,
	update: data => set({ ...data }),
}))
