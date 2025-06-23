"use client"

import React, { useState } from "react"
import BoardCard from "./board-card"
import DeleteTaskModal from "../_modals/delete-task-modal"
import TaskModal from "../_modals/task-modal"
import dynamic from "next/dynamic"
import { useViewSection } from "../../_hook/use-view-section"
import { BoardDetailProvider } from "../../_hook/use-board"
import Icons from "@/components/shared/icons"
import BoardNewInput from "./board-new-input"
import { useBoardGlobal } from "@/hooks/use-board-global"

const BoardAddButton = dynamic(() => import("./board-add-button"), {
	ssr: false,
})

const SelectBoard = () => {
	return (
		<div className="flex items-center gap-2 flex-1 flex-col justify-center dark:text-neutral-400 text-slate-500">
			<Icons.Misc.NoData className="size-28" />
			Please select a board to view its details.
		</div>
	)
}

export default function BoardView() {
	const { isNewBoard } = useViewSection()
	const { selectedBoard } = useBoardGlobal()

	return (
		<>
			<TaskModal />
			<DeleteTaskModal />

			<div className="flex-1 overflow-y-auto flex gap-2 overflow-x-auto">
				{selectedBoard ? (
					<>
						{selectedBoard?.details?.map((boardDetail, index) => (
							<BoardDetailProvider
								boardDetail={boardDetail}
								key={`board-details-${boardDetail.id}-${selectedBoard?.id}-${index}`}
							>
								<BoardCard />
							</BoardDetailProvider>
						))}
						{!isNewBoard && <BoardAddButton />}
						{isNewBoard && <BoardNewInput />}
					</>
				) : (
					<SelectBoard />
				)}
			</div>
		</>
	)
}
