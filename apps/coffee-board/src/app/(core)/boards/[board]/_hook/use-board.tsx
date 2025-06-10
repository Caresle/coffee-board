"use client"

import { queryKeys } from "@/constants/queryKeys"
import { BoardDetails } from "@/entities/board.entity"
import { Task } from "@/entities/task.entity"
import taskService from "@/services/task.service"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { createContext, useContext, useMemo, useState } from "react"

interface BoardContextType {
	boardDetail: BoardDetails
	QTasks: UseQueryResult<Task[]>
	tasks: Task[]
	isNewTask: boolean
	setIsNewTask: (isNewTask: boolean) => void
}

const BoardContext = createContext<BoardContextType>({
	boardDetail: {} as BoardDetails,
	QTasks: {} as UseQueryResult<Task[]>,
	tasks: [],
	isNewTask: false,
	setIsNewTask: () => {},
})

export const useBoard = () => useContext(BoardContext)

export function BoardDetailProvider({
	boardDetail,
	children,
}: {
	boardDetail: BoardDetails
	children: React.ReactNode
}) {
	const [isNewTask, setIsNewTask] = useState(false)

	const QTasks = useQuery({
		queryKey: [
			queryKeys.tasks,
			{
				id: boardDetail.id,
			},
		],
		queryFn: () => taskService.getByBoardDetId(boardDetail.id),
	})

	const tasks = useMemo(() => QTasks?.data || [], [QTasks])

	const value: BoardContextType = {
		boardDetail,
		QTasks,
		tasks,
		isNewTask,
		setIsNewTask,
	}

	return <BoardContext value={value}>{children}</BoardContext>
}
