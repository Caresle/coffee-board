"use client"
import React, { useState } from "react"
import BoardCard from "./board-card"
import { Button } from "@/components/ui/button"
import Icons from "@/components/shared/icons"

export default function BoardView() {
	const [boards, setBoards] = useState([{}])

	const onAddBoard = () => {
		setBoards([...boards, {}])
	}

	return (
		<div className="flex-1 overflow-y-auto flex gap-2 overflow-x-auto">
			{boards.map((_, index) => (
				<BoardCard key={index} />
			))}
			<Button variant={"secondary"} onClick={onAddBoard} className="w-[300px]">
				<Icons.Actions.Add />
			</Button>
		</div>
	)
}
