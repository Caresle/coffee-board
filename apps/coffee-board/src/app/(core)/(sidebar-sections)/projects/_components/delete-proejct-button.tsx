import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useDeleteProjectStore } from "../_states/delete-project.state"

export default function DeleteProjectButton() {
	const { update } = useDeleteProjectStore(state => state)

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
