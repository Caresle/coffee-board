import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { usePriorityStore } from "../_states/priority.state"
import { usePriorityDeleteStore } from "../_states/priority-delete.state"
import { Priority } from "@/entities/priority.entity"

export default function PriorityItem({ priority }: { priority: Priority }) {
	const { update } = usePriorityStore.getState()
	const { update: updateDelete } = usePriorityDeleteStore.getState()

	return (
		<div className="bg-white p-2 rounded-lg flex items-center justify-between dark:bg-neutral-800">
			<div className="flex gap-2 items-center">
				<span className="size-8 border p-2 flex items-center justify-center dark:border-neutral-700 rounded-md shadow">
					{priority.value}
				</span>
				<h2>{priority.name}</h2>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={() => update({ show: true, isEdit: true, item: priority })}
				>
					<Icons.Actions.Edit />
				</Button>
				<Button
					variant={"destructive"}
					size={"icon"}
					onClick={() => updateDelete({ show: true, item: priority })}
				>
					<Icons.Actions.Delete />
				</Button>
			</div>
		</div>
	)
}
