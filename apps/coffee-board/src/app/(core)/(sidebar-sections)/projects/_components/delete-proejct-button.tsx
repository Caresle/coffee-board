import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useDeleteProjectStore } from "../_states/delete-project.state"
import { useProject } from "../_hook/use-project"

export default function DeleteProjectButton() {
	const { project } = useProject()
	const { update } = useDeleteProjectStore.getState()

	return (
		<DropdownMenuItem
			onClick={() => update({ show: true, item: project })}
			className="text-red-500 hover:text-red-600"
		>
			<Icons.Actions.Delete className="text-red-500 hover:text-red-600" />
			Delete
		</DropdownMenuItem>
	)
}
