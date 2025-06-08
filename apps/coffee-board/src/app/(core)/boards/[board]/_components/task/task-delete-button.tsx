import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useDeleteTaskStore } from "../../_states/delete-task.state"
import { useTask } from "../../_hook/use-task"

export default function TaskDeleteButton() {
	const { task } = useTask()
	const { update } = useDeleteTaskStore.getState()

	return (
		<DropdownMenuItem
			onClick={() => update({ show: true, item: task })}
			className="text-red-500 hover:text-red-600"
		>
			<Icons.Actions.Delete className="text-red-500 hover:text-red-600" />
			Delete
		</DropdownMenuItem>
	)
}
