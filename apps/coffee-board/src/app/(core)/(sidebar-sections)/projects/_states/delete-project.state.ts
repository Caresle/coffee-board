import { Project } from "@/entities/project.entity"
import { create } from "zustand"

interface DeleteProjectState {
	show: boolean
	item: Project
	update: (data: Partial<DeleteProjectState>) => void
}

export const useDeleteProjectStore = create<DeleteProjectState>(set => ({
	show: false,
	item: {} as Project,
	update: data => set({ ...data }),
}))
