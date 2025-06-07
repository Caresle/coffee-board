import React from "react"
import { useBoard } from "../../_hook/use-board"
import BoardMenu from "./board-menu"
import BoardAddTaskButton from "./board-add-task-button"

export default function BoardHeader() {
	const { boardDetail } = useBoard()

	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-bold capitalize">{boardDetail.name}</h2>
			<div>
				<BoardMenu />
				<BoardAddTaskButton />
			</div>
		</div>
	)
}
