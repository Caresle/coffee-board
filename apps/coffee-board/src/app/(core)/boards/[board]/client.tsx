"use client"
import { Separator } from "@/components/ui/separator"
import React from "react"
import {
	useViewSection,
	VIEW_SECTION,
	ViewSectionProvider,
} from "./_hook/use-view-section"
import ProjectTitle from "./_components/project-title"
import TitleActions from "./_components/title-actions"
import FilterDisplaySection from "./_components/filter-display-section"
import OverviewSection from "./_components/overview/overview-section"
import BoardView from "./_components/board/board-view"

const ViewDisplay = () => {
	const { section } = useViewSection()
	if (section === VIEW_SECTION.OVERVIEW) {
		return <OverviewSection />
	}

	if (section === VIEW_SECTION.BOARD) {
		return <BoardView />
	}

	if (section === VIEW_SECTION.CALENDAR) {
		return <></>
	}
	return <></>
}

export default function Client() {
	return (
		<ViewSectionProvider>
			<div className="flex flex-col gap-2 flex-1 overflow-y-auto p-2">
				<div className="flex items-center justify-between">
					<ProjectTitle />
					<TitleActions />
				</div>
				<FilterDisplaySection />
				<Separator />
				<ViewDisplay />
			</div>
		</ViewSectionProvider>
	)
}
