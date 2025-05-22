import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useDeleteTaskStore } from "../../_states/delete-task.state"

export default function TaskDeleteButton() {
	const { update } = useDeleteTaskStore(state => state)
	return (
		<DropdownMenuItem
			onClick={() => update({ show: true })}
			className="text-red-500 hover:text-red-600"
		>
			<Icons.Actions.Delete className="text-red-500 hover:text-red-600" />
			Delete
		</DropdownMenuItem>
	)
}
