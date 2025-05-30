"use client"

import { Project } from "@/entities/project.entity"
import { createContext, useContext } from "react"

interface ProjectHook {
	project: Project
}

const ProjectContext = createContext<ProjectHook>({
	project: {} as Project,
})

export const useProject = () => useContext(ProjectContext)

export const ProjectProvider = ({
	children,
	project,
}: {
	children: React.ReactNode
	project: Project
}) => {
	return <ProjectContext value={{ project }}>{children}</ProjectContext>
}
