import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useTagStore } from "../_states/tag.state"
import { useTagDeleteStore } from "../_states/tag-delete.state"

export default function TagItem({ tag }: { tag: string }) {
	const { update } = useTagStore.getState()
	const { update: updateDelete } = useTagDeleteStore.getState()

	return (
		<div
			key={tag}
			className="bg-white rounded-lg p-2 border flex items-center justify-between dark:bg-slate-800"
		>
			<div>{tag}</div>
			<div className="flex items-center gap-2">
				<TooltipBasic title="Edit">
					<Button
						variant="outline"
						size={"icon"}
						onClick={() => update({ show: true, isEdit: true })}
					>
						<Icons.Actions.Edit />
					</Button>
				</TooltipBasic>
				<TooltipBasic title="Delete">
					<Button
						variant="destructive"
						size={"icon"}
						onClick={() => updateDelete({ show: true })}
					>
						<Icons.Actions.Delete />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
