"use client"

import React from "react"
import ProjectCard from "./_components/project-card"
import ArchiveModal from "./_components/_modal/archive-modal"
import DeleteProjectModal from "./_components/_modal/delete-project-modal"

export default function Client() {
	return (
		<div className="flex-1 flex flex-col gap-2 overflow-y-auto p-2">
			<ArchiveModal />
			<DeleteProjectModal />

			<h1 className="text-2xl font-semibold">Projects</h1>

			<div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg">
				<div className="gap-2 overflow-y-auto p-2 grid grid-cols-3">
					<ProjectCard />
				</div>
			</div>
		</div>
	)
}
