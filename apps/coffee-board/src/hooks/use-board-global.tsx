"use client"
import { Board } from "@/entities/board.entity"
import { ComboboxState, useCombobox } from "@/hooks/use-combobox"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"

interface BoardContextType {
	selectedBoard: Board | null
	setSelectedBoard: (board: Board | null) => void
	boardSelected: ComboboxState<Board>
	QBoards: UseQueryResult<Board[]>
	reOrderBoard: boolean
	setReOrderBoard: (reOrderBoard: boolean) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

export const useBoardGlobal = () => {
	const context = useContext(BoardContext)
	if (!context) {
		throw new Error("useBoardGlobal must be used within a BoardProvider")
	}
	return context
}

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
	const [reOrderBoard, setReOrderBoard] = useState(false)

	const boardSelected = useCombobox<Board>(null)
	const pathname = usePathname()

	// Get project ID from URL if we're on a board page
	const projectId = pathname.includes("/boards/")
		? +pathname.split("/boards/")[1] || 0
		: 0

	// Fetch boards for the current project
	const QBoards = useQuery<Board[]>({
		queryKey: [queryKeys.boards, { id: projectId }],
		queryFn: () => getAllBoardsByProject(projectId),
		enabled: projectId > 0,
	})

	// Initialize with the first board when boards are loaded
	useEffect(() => {
		if (QBoards.data && QBoards.data.length > 0 && !selectedBoard) {
			const firstBoard = QBoards.data[0]
			setSelectedBoard(firstBoard)
			boardSelected.set(firstBoard)
		}
	}, [QBoards.data, selectedBoard, boardSelected])

	const value: BoardContextType = {
		selectedBoard,
		setSelectedBoard,
		boardSelected,
		QBoards,

		reOrderBoard,
		setReOrderBoard,
	}

	return <BoardContext value={value}>{children}</BoardContext>
}
