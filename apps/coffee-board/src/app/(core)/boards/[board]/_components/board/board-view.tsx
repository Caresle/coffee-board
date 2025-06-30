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
import DeleteBoardModal from "../_modals/_board/delete-board-modal"
import ArchiveBoardModal from "../_modals/_board/archive-board-modal"
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core"
import { Task } from "@/entities/task.entity"
import TaskCardFloat from "../task/task-card-float"
import { BoardDetails } from "@/entities/board.entity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import { queryKeys } from "@/constants/queryKeys"
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
	const [parent, setParent] = useState<string | null>(null)
	const [draggedItem, setDraggedItem] = useState<Task | null>(null)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: async (body: {
			id_task: number
			id_board_det: number
			id_board_original: number
		}) => {
			await taskService.updateBoard(body)
			return body
		},
		onSuccess: body => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.tasks, { id: body.id_board_original }],
			})
			queryClient.invalidateQueries({
				queryKey: [queryKeys.tasks, { id: body.id_board_det }],
			})
		},
	})

	const onDragStart = (event: DragStartEvent) => {
		setParent(event.active.id as string)
		setDraggedItem(event.active.data.current as Task)
	}

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		setParent(null)
		setDraggedItem(null)

		if (!over) return

		const boardDetail = over.data.current as BoardDetails
		const task = active.data.current as Task

		const body = {
			id_task: task.id,
			id_board_original: task.id_board_det,
			id_board_det: boardDetail.id,
		}

		mut.mutate(body)
	}

	return (
		<>
			<TaskModal />
			<DeleteTaskModal />
			<DeleteBoardModal />
			<ArchiveBoardModal />

			<DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<DragOverlay>
					<div>{parent && <TaskCardFloat task={draggedItem!} />}</div>
				</DragOverlay>
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
			</DndContext>
		</>
	)
}
