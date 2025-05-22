import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useProjectStore } from "../_states/project.state"

export default function EditProjectButton() {
	const { update } = useProjectStore(state => state)
	return (
		<DropdownMenuItem
			onClick={() => update({ show: true })}
			className="text-purple-500 hover:text-purple-500"
		>
			<Icons.Actions.Edit className="text-purple-500 hover:text-purple-500" />
			Edit
		</DropdownMenuItem>
	)
}
