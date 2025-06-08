import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import TaskDeleteButton from "./task-delete-button"
import { useTask } from "../../_hook/use-task"
import { useTaskStore } from "../../_states/task.state"

const TaskDropdownMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<TaskDeleteButton />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default function TaskHeader() {
	const { task } = useTask()
	const { update } = useTaskStore.getState()

	const onOpenTask = () => update({ show: true, item: task })

	return (
		<div className="flex justify-between items-center">
			<h3
				className="transition-all hover:bg-slate-100 dark:hover:bg-neutral-700 w-full truncate rounded-md p-1 cursor-pointer select-none"
				onClick={onOpenTask}
			>
				{task.name}
			</h3>
			<div className="flex items-center gap-2">
				<TaskDropdownMenu />
			</div>
		</div>
	)
}
