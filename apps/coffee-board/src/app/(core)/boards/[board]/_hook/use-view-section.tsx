import { Board } from "@/entities/board.entity"
import { ComboboxState, useCombobox } from "@/hooks/use-combobox"
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
	boardSelected: ComboboxState<Board>
}

const ViewSectionContext = createContext<IViewSectionContext>({
	section: VIEW_SECTION.BOARD,
	setSection: () => {},
	boards: [],
	boardSelected: {} as ComboboxState<Board>,
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

	const boardSelected = useCombobox<Board>()

	const value: IViewSectionContext = {
		boards: initialBoards,
		section,
		setSection,
		boardSelected,
	}

	return <ViewSectionContext value={value}>{children}</ViewSectionContext>
}
