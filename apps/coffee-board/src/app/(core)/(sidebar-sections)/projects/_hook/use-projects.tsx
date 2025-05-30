"use client"

import { getAllProjects } from "@/actions/projects/get-all-projects"
import { queryKeys } from "@/constants/queryKeys"
import { Project } from "@/entities/project.entity"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useContext, createContext, useMemo } from "react"

interface ProjectContextProps {
	QProject: UseQueryResult<Project[], void>
	projects: Project[]
}

const ProjectContext = createContext<ProjectContextProps>({
	QProject: {} as UseQueryResult<Project[], void>,
	projects: [],
})

export const useProjects = () => {
	return useContext(ProjectContext)
}

export const ProjectProvider = ({
	initialProjects,
	children,
}: {
	initialProjects: Project[]
	children: React.ReactNode
}) => {
	const QProject = useQuery<Project[], void>({
		queryKey: [queryKeys.projects],
		queryFn: getAllProjects,
		initialData: initialProjects,
	})

	const projects = useMemo(() => QProject.data ?? [], [QProject.data])

	const value: ProjectContextProps = {
		QProject,
		projects,
	}

	return <ProjectContext value={value}>{children}</ProjectContext>
}
