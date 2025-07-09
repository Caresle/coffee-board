import React from "react"
import ProjectCard from "./project-card"
import { useProjects } from "../_hook/use-projects"
import Icons from "@/components/shared/icons"
import { ProjectProvider } from "../_hook/use-project"

const NoProjects = () => {
	return (
		<div className="flex items-center justify-center h-full p-4 flex-col gap-2 text-slate-500 dark:text-neutral-500">
			<Icons.Misc.Books className="size-32" />
			<p className="text-gray-500">
				No projects found. Create a new project to get started.
			</p>
		</div>
	)
}

export default function ProjectContainer() {
	const { QProject, projects } = useProjects()

	const isLoading =
		QProject.isLoading || QProject.isFetching || QProject.isRefetching

	return (
		<div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg dark:bg-neutral-900">
			{isLoading && (
				<div className="flex items-center justify-center h-full p-4 flex-col gap-2">
					<Icons.Misc.Refresh className="size-32 animate-spin text-slate-500 dark:text-neutral-500" />
					<p>Loading projects...</p>
				</div>
			)}
			{!isLoading && projects.length === 0 && <NoProjects />}
			{!isLoading && projects.length > 0 && (
				<div className="gap-2 overflow-y-auto p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{projects.map(project => (
						<ProjectProvider key={`project-${project.id}`} project={project}>
							<ProjectCard />
						</ProjectProvider>
					))}
				</div>
			)}
		</div>
	)
}
