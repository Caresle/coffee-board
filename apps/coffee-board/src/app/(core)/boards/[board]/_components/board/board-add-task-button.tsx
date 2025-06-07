import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useBoard } from "../../_hook/use-board"

export default function BoardAddTaskButton() {
	const { setIsNewTask } = useBoard()

	const onAddTask = () => {
		setIsNewTask(true)

		setTimeout(() => {
			const el = document.getElementById("new-task-input")
			el?.focus()
		}, 100)
	}

	return (
		<TooltipBasic title="Add">
			<Button variant={"ghost"} onClick={onAddTask}>
				<Icons.Actions.Add className="size-5" />
			</Button>
		</TooltipBasic>
	)
}
