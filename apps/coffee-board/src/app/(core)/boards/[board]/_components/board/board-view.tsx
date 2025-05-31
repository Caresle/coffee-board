"use client"

import React, { useState } from "react"
import BoardCard from "./board-card"
import DeleteTaskModal from "../_modals/delete-task-modal"
import TaskModal from "../_modals/task-modal"
import dynamic from "next/dynamic"
import { useViewSection } from "../../_hook/use-view-section"
import { BoardDetailProvider } from "../../_hook/use-board"
import Icons from "@/components/shared/icons"

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
	const { boardSelected } = useViewSection()

	const onAddBoard = () => {
		// setBoards([...boards, {}])
	}

	return (
		<>
			<TaskModal />
			<DeleteTaskModal />

			<div className="flex-1 overflow-y-auto flex gap-2 overflow-x-auto">
				{boardSelected.value ? (
					<>
						{boardSelected.value?.details?.map((boardDetail, index) => (
							<BoardDetailProvider
								boardDetail={boardDetail}
								key={`board-details-${boardSelected.value?.id}-${index}`}
							>
								<BoardCard />
							</BoardDetailProvider>
						))}
						{boardSelected.value && <BoardAddButton onAddBoard={onAddBoard} />}
					</>
				) : (
					<SelectBoard />
				)}
			</div>
		</>
	)
}
