"use client"

import React, { useMemo, useState } from "react"
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
	MouseSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core"
import { Task } from "@/entities/task.entity"
import TaskCardFloat from "../task/task-card-float"
import { BoardDetails } from "@/entities/board.entity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import { queryKeys } from "@/constants/queryKeys"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"

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
	const { selectedBoard, reOrderBoard } = useBoardGlobal()
	const [parent, setParent] = useState<string | null>(null)
	const [draggedItem, setDraggedItem] = useState<Task | null>(null)
	const [draggedBoard, setDraggedBoard] = useState<BoardDetails | null>(null)
	const queryClient = useQueryClient()

	const modifiers = useMemo(() => {
		if (reOrderBoard) {
			return [restrictToHorizontalAxis]
		}
		return []
	}, [reOrderBoard])

	// Sensors
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	})

	const sensors = useSensors(mouseSensor)

	const mut = useMutation({
		mutationFn: async (body: {
			id_task: number
			id_board_det: number
			id_board_original: number
			task_order: number | null
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
		if (reOrderBoard) {
			setDraggedBoard(event.active.data.current as BoardDetails)
			return
		}
		setDraggedItem(event.active.data.current as Task)
	}

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		setParent(null)
		if (reOrderBoard) {
			setDraggedBoard(null)

			if (!over) return

			const boardDetail = over.data.current as BoardDetails

			if (draggedBoard?.id === boardDetail.id) return

			console.log("over", over)
			return
		}

		if (!reOrderBoard) {
			setDraggedItem(null)
		}

		if (!over) return

		console.log(active.data.current)
		console.log(over.data.current)
		const overTask = over.data.current
		let taskOrder = null
		let boardDetailId = null

		if (overTask?.sortable?.containerId) {
			const overTask = over.data.current as Task

			taskOrder = (overTask.task_order ?? 1) - 1
			boardDetailId = overTask.id_board_det
		}

		console.log("continue")

		const boardDetail = over.data.current as BoardDetails
		const task = active.data.current as Task

		const body = {
			id_task: task.id,
			id_board_original: task.id_board_det,
			id_board_det: boardDetailId ?? boardDetail.id,
			task_order: taskOrder ?? task.task_order ?? null,
		}

		console.log("mutate")
		console.log(body)
		mut.mutate(body)
	}

	return (
		<>
			<TaskModal />
			<DeleteTaskModal />
			<DeleteBoardModal />
			<ArchiveBoardModal />

			<DndContext
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				sensors={sensors}
				modifiers={modifiers}
			>
				<DragOverlay>
					<div>
						{!reOrderBoard && parent && <TaskCardFloat task={draggedItem!} />}
					</div>
					<div>{reOrderBoard && draggedBoard && <div>draggin board</div>}</div>
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
