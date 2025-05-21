import Icons from "@/components/shared/icons"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"
import { useArchiveProjectStore } from "../_states/archive-project.state"

export default function ArchiveProjectButton() {
	const { update } = useArchiveProjectStore(state => state)
	return (
		<DropdownMenuItem onClick={() => update({ show: true })}>
			<Icons.Misc.Archive />
			Archive
		</DropdownMenuItem>
	)
}
