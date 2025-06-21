import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"
import { queryKeys } from "@/constants/queryKeys"
import { Board } from "@/entities/board.entity"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
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
	isNewBoard: boolean
	setIsNewBoard: (isNewBoard: boolean) => void
	boards: Board[]
	QBoards: UseQueryResult<Board[]>
}

const ViewSectionContext = createContext<IViewSectionContext>({
	section: VIEW_SECTION.BOARD,
	setSection: () => {},
	boards: [],
	isNewBoard: false,
	setIsNewBoard: () => {},
	QBoards: {} as UseQueryResult<Board[]>,
})

export const useViewSection = () => useContext(ViewSectionContext)

export function ViewSectionProvider({
	initialBoards = [],
	boardId,
	children,
}: {
	initialBoards?: Board[]
	boardId: number
	children: React.ReactNode
}) {
	const [isNewBoard, setIsNewBoard] = useState(false)
	const [section, setSection] = useState<
		(typeof VIEW_SECTION)[keyof typeof VIEW_SECTION]
	>(VIEW_SECTION.BOARD)

	const QBoards = useQuery<Board[]>({
		queryKey: [queryKeys.boards, { id: boardId }],
		queryFn: () => getAllBoardsByProject(+boardId),
	})

	const value: IViewSectionContext = {
		boards: initialBoards,
		section,
		setSection,
		isNewBoard,
		setIsNewBoard,
		QBoards,
	}

	return <ViewSectionContext value={value}>{children}</ViewSectionContext>
}
