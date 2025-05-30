import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { useProjectStore } from "../_states/project.state"

export default function TopActions() {
	const { update } = useProjectStore.getState()
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-2xl font-semibold">Projects</h1>
			<Button onClick={() => update({ show: true, isEdit: false })}>
				<Icons.Actions.Add />
				New Project
			</Button>
		</div>
	)
}
