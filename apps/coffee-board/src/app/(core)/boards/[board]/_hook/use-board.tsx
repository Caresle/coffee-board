"use client"

import { queryKeys } from "@/constants/queryKeys"
import { BoardDetails } from "@/entities/board.entity"
import { Task } from "@/entities/task.entity"
import taskService from "@/services/task.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext } from "react"

interface BoardContextType {
	boardDetail: BoardDetails
	QTasks: UseQueryResult<Task[]>
}

const BoardContext = createContext<BoardContextType>({
	boardDetail: {} as BoardDetails,
	QTasks: {} as UseQueryResult<Task[]>,
})

export const useBoard = () => useContext(BoardContext)

export function BoardDetailProvider({
	boardDetail,
	children,
}: {
	boardDetail: BoardDetails
	children: React.ReactNode
}) {
	const QTasks = useQuery({
		queryKey: [
			queryKeys.tasks,
			{
				id: boardDetail.id,
			},
		],
		queryFn: () => taskService.getByBoardDetId(boardDetail.id),
	})

	const value: BoardContextType = {
		boardDetail,
		QTasks,
	}

	return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
