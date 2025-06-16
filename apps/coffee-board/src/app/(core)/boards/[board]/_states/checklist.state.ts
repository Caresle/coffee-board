import { TaskCheckListHeader } from "@/entities/task.entity"
import { create } from "zustand"

interface ChecklistState {
	isNew: boolean
	item: TaskCheckListHeader
	update: (data: Partial<ChecklistState>) => void
}

export const useChecklistStore = create<ChecklistState>(set => ({
	isNew: false,
	item: {} as TaskCheckListHeader,
	update: data => set({ ...data }),
}))
