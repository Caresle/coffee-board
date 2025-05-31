import { Board } from "@/entities/board.entity"
import { createContext, useContext, useState } from "react"

export const VIEW_SECTION = {
	OVERVIEW: "OVERVIEW",
	BOARD: "BOARD",
	CALENDAR: "CALENDAR",
}

interface IViewSectionContext {
	section: (typeof VIEW_SECTION)[keyof typeof VIEW_SECTION]
	setSection: (
		section: (typeof VIEW_SECTION)[keyof typeof VIEW_SECTION],
	) => void
	boards: Board[]
}

const ViewSectionContext = createContext<IViewSectionContext>({
	section: VIEW_SECTION.BOARD,
	setSection: () => {},
	boards: [],
})

export const useViewSection = () => useContext(ViewSectionContext)

export function ViewSectionProvider({
	initialBoards = [],
	children,
}: {
	initialBoards?: Board[]
	children: React.ReactNode
}) {
	const [section, setSection] = useState<
		(typeof VIEW_SECTION)[keyof typeof VIEW_SECTION]
	>(VIEW_SECTION.BOARD)

	const value: IViewSectionContext = {
		boards: initialBoards,
		section,
		setSection,
	}

	return <ViewSectionContext value={value}>{children}</ViewSectionContext>
}
