import React, { useMemo } from "react"
import BoardHeader from "./board-header"
import TaskCard from "../task/task-card"
import Icons from "@/components/shared/icons"
import { useBoard } from "../../_hook/use-board"
import { TaskProvider } from "../../_hook/use-task"
import TaskCreateCard from "../task/task-create-card"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

const NoTasks = () => {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-neutral-500">
			<Icons.Misc.Books className="size-24" />
			<p>No Tasks</p>
		</div>
	)
}

const Loading = () => {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-neutral-500">
			<Icons.Misc.Refresh className="size-24" />
			<p>Loading</p>
		</div>
	)
}

export default function BoardCard() {
	const { QTasks, isNewTask, tasks, boardDetail } = useBoard()

	const { setNodeRef } = useDroppable({
		id: boardDetail.id,
	})

	return (
		<div className="border p-2 bg-white rounded-lg flex flex-col gap-2 overflow-y-auto w-[300px] dark:bg-neutral-800">
			<BoardHeader />

			<div
				ref={setNodeRef}
				className={cn(
					"flex flex-col gap-2 overflow-y-auto flex-1 bg-slate-100 p-2 rounded-lg dark:bg-neutral-900",
				)}
			>
				{isNewTask && <TaskCreateCard />}
				{QTasks.isLoading && <Loading />}
				{!QTasks.isLoading && tasks.length === 0 && <NoTasks />}
				{!QTasks.isLoading &&
					tasks.length > 0 &&
					tasks.map((task, index) => (
						<TaskProvider key={`task-${task.id}-${index}`} task={task}>
							<TaskCard />
						</TaskProvider>
					))}
			</div>
		</div>
	)
}
