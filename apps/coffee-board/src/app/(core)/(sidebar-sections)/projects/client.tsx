"use client"

import React from "react"
import ArchiveModal from "./_components/_modal/archive-modal"
import DeleteProjectModal from "./_components/_modal/delete-project-modal"
import TopActions from "./_components/top-actions"
import ProjectModal from "./_components/_modal/project-modal"
import { ProjectProvider } from "./_hook/use-projects"
import { Project } from "@/entities/project.entity"
import ProjectContainer from "./_components/project-container"

export default function Client({
	initialProjects = [],
}: {
	initialProjects: Project[]
}) {
	return (
		<ProjectProvider initialProjects={initialProjects}>
			<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
				<ArchiveModal />
				<DeleteProjectModal />
				<ProjectModal />

				<TopActions />
				<ProjectContainer />
			</div>
		</ProjectProvider>
	)
}
