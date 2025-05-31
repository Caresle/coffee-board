"use client"

import React, { useState } from "react"
import BoardCard from "./board-card"
import DeleteTaskModal from "../_modals/delete-task-modal"
import TaskModal from "../_modals/task-modal"
import dynamic from "next/dynamic"

const BoardAddButton = dynamic(() => import("./board-add-button"), {
	ssr: false,
})

export default function BoardView() {
	const [boards, setBoards] = useState([{}])

	const onAddBoard = () => {
		setBoards([...boards, {}])
	}

	return (
		<>
			<TaskModal />
			<DeleteTaskModal />

			<div className="flex-1 overflow-y-auto flex gap-2 overflow-x-auto">
				{boards.map((_, index) => (
					<BoardCard key={index} />
				))}
				<BoardAddButton onAddBoard={onAddBoard} />
			</div>
		</>
	)
}
