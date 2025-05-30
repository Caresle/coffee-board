import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useProjectStore } from "../_states/project.state"
import { useProject } from "../_hook/use-project"

export default function EditProjectButton() {
	const { project } = useProject()
	const { update } = useProjectStore.getState()

	return (
		<DropdownMenuItem
			onClick={() => update({ show: true, isEdit: true, item: project })}
			className="text-purple-500 hover:text-purple-500"
		>
			<Icons.Actions.Edit className="text-purple-500 hover:text-purple-500" />
			Edit
		</DropdownMenuItem>
	)
}
