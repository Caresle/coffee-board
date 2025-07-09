import React from "react"
import { useDashboard } from "../_hooks/use-dashboard"
import Icons from "@/components/shared/icons"

const RecentProjectCard = () => {
	return (
		<div className="w-1/3 bg-white rounded-lg p-2 border dark:bg-neutral-800">
			1
		</div>
	)
}

const NoProjectsFound = () => {
	return (
		<div className="w-full flex flex-col items-center gap-1 text-slate-500 dark:text-neutral-400 font-semibold">
			<Icons.Misc.Books className="size-12" />
			<div>No projects found</div>
		</div>
	)
}

export default function RecentProjects() {
	const { data } = useDashboard()
	return (
		<div>
			<h2 className="font-semibold text-xl">Recent Projects</h2>
			<div className="bg-slate-50 flex-1 p-2 rounded-lg flex gap-2 dark:bg-neutral-900">
				{(data.recent_projects.length === 0 || !data.recent_projects) && (
					<NoProjectsFound />
				)}
				{data.recent_projects.length > 0 &&
					data.recent_projects.map(project => (
						<RecentProjectCard key={project.id} />
					))}
			</div>
		</div>
	)
}
