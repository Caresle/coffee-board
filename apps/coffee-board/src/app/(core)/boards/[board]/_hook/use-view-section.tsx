import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"
import { queryKeys } from "@/constants/queryKeys"
import { Board } from "@/entities/board.entity"
import { Project } from "@/entities/project.entity"
import projectService from "@/services/project.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext, useMemo, useState } from "react"

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
	project: Project
}

const ViewSectionContext = createContext<IViewSectionContext>({
	section: VIEW_SECTION.BOARD,
	setSection: () => {},
	boards: [],
	isNewBoard: false,
	setIsNewBoard: () => {},
	QBoards: {} as UseQueryResult<Board[]>,
	project: {} as Project,
})

export const useViewSection = () => useContext(ViewSectionContext)

export function ViewSectionProvider({
	initialBoards = [],
	initialProject,
	boardId,
	children,
}: {
	initialBoards?: Board[]
	initialProject: Project
	boardId: number
	children: React.ReactNode
}) {
	const [isNewBoard, setIsNewBoard] = useState(false)
	const [section, setSection] = useState<
		(typeof VIEW_SECTION)[keyof typeof VIEW_SECTION]
	>(VIEW_SECTION.BOARD)

	const QProjects = useQuery({
		queryKey: [queryKeys.projects, { id: initialProject?.id }],
		queryFn: () => projectService.getById(initialProject?.id || 0),
		initialData: initialProject,
	})

	const QBoards = useQuery<Board[]>({
		queryKey: [queryKeys.boards, { id: boardId }],
		queryFn: () => getAllBoardsByProject(+boardId),
	})

	const project = useMemo(() => QProjects?.data ?? ({} as Project), [QProjects])

	const value: IViewSectionContext = {
		boards: initialBoards,
		section,
		setSection,
		isNewBoard,
		setIsNewBoard,
		QBoards,
		project,
	}

	return <ViewSectionContext value={value}>{children}</ViewSectionContext>
}
