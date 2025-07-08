import BoardHeader from "./board-header"
import TaskCard from "../task/task-card"
import Icons from "@/components/shared/icons"
import { useBoard } from "../../_hook/use-board"
import { TaskProvider } from "../../_hook/use-task"
import TaskCreateCard from "../task/task-create-card"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { useBoardGlobal } from "@/hooks/use-board-global"

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
	const { reOrderBoard } = useBoardGlobal()
	const { QTasks, isNewTask, tasks, boardDetail } = useBoard()

	const {
		attributes,
		listeners,
		setNodeRef: setNodeRefDraggable,
	} = useDraggable({
		id: `board-container-drag-${boardDetail.id}`,
		data: boardDetail,
		disabled: !reOrderBoard,
	})

	const { setNodeRef: setNodeRefDroppable, isOver } = useDroppable({
		id: `board-container-order-${boardDetail.id}`,
		data: boardDetail,
		disabled: !reOrderBoard,
	})

	const { setNodeRef } = useDroppable({
		id: boardDetail.id,
		data: boardDetail,
		disabled: reOrderBoard,
	})

	return (
		<div
			ref={setNodeRefDroppable}
			className={cn(
				"border p-2 bg-white rounded-lg flex flex-col gap-2 overflow-y-auto w-[300px] dark:bg-neutral-800 shrink-0",
				{
					"border-red-500": isOver,
				},
			)}
		>
			<div
				{...attributes}
				{...listeners}
				ref={setNodeRefDraggable}
				className="flex flex-1 flex-col gap-1"
			>
				<BoardHeader />

				<div
					ref={setNodeRef}
					className={cn(
						"flex flex-col gap-2 overflow-y-auto flex-1 bg-slate-100 p-2 rounded-lg dark:bg-neutral-900",
						{
							"opacity-50": reOrderBoard,
						},
					)}
				>
					{isNewTask && <TaskCreateCard />}
					{QTasks.isLoading && <Loading />}
					{!QTasks.isLoading && tasks.length === 0 && <NoTasks />}
					{!QTasks.isLoading &&
						tasks.length > 0 &&
						tasks.map((task, index) => (
							<TaskProvider
								key={`task-${task.id}-${task.id_board_det}-${index}`}
								task={task}
							>
								<TaskCard />
							</TaskProvider>
						))}
				</div>
			</div>
		</div>
	)
}
