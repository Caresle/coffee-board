import React from "react"
import BoardCard from "./board-card"

export default function BoardView() {
	return (
		<div className="flex-1 overflow-y-auto grid grid-cols-4 gap-2">
			<BoardCard />
		</div>
	)
}
