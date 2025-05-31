"use client"

import { BoardDetails } from "@/entities/board.entity"
import { createContext, useContext } from "react"

interface BoardContextType {
	boardDetail: BoardDetails
}

const BoardContext = createContext<BoardContextType>({
	boardDetail: {} as BoardDetails,
})

export const useBoard = () => useContext(BoardContext)

export function BoardDetailProvider({
	boardDetail,
	children,
}: {
	boardDetail: BoardDetails
	children: React.ReactNode
}) {
	const value: BoardContextType = {
		boardDetail,
	}

	return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
