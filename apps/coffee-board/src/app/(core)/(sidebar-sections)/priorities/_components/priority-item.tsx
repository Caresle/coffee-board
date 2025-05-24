import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { usePriorityStore } from "../_states/priority.state"
import { usePriorityDeleteStore } from "../_states/priority-delete.state"

export default function PriorityItem() {
	const { update } = usePriorityStore.getState()
	const { update: updateDelete } = usePriorityDeleteStore.getState()

	return (
		<div className="bg-white p-2 rounded-lg flex items-center justify-between">
			<h2>Priority</h2>
			<div className="flex items-center gap-2">
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={() => update({ show: true, isEdit: true })}
				>
					<Icons.Actions.Edit />
				</Button>
				<Button
					variant={"destructive"}
					size={"icon"}
					onClick={() => updateDelete({ show: true })}
				>
					<Icons.Actions.Delete />
				</Button>
			</div>
		</div>
	)
}
