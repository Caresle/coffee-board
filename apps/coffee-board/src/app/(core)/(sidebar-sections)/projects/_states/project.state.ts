import { Project } from "@/entities/project.entity"
import { create } from "zustand"

interface ProjectState {
	show: boolean
	item: Project
	isEdit?: boolean
	update: (data: Partial<ProjectState>) => void
}

export const useProjectStore = create<ProjectState>(set => ({
	show: false,
	item: {} as Project,
	isEdit: false,
	update: data => set({ ...data }),
}))
