import { Separator } from "@/components/ui/separator"
import React from "react"
import FilterDisplaySection from "./_components/filter-display-section"
import TitleActions from "./_components/title-actions"
import ProjectTitle from "./_components/project-title"
import BoardCard from "./_components/board/board-card"

export default function Client() {
	return (
		<div className="flex flex-col gap-2 flex-1 overflow-y-auto p-2">
			<div className="flex items-center justify-between">
				<ProjectTitle />
				<TitleActions />
			</div>
			<FilterDisplaySection />
			<Separator />
			<div className="flex-1 overflow-y-auto grid grid-cols-4 gap-2">
				<BoardCard />
			</div>
		</div>
	)
}
