import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useTagStore } from "../_states/tag.state"
import { useTagDeleteStore } from "../_states/tag-delete.state"
import { Tag } from "@/entities/tag.entity"

export default function TagItem({ tag }: { tag: Tag }) {
	const { update } = useTagStore.getState()
	const { update: updateDelete } = useTagDeleteStore.getState()

	return (
		<div className="bg-white rounded-lg p-2 border flex items-center justify-between dark:bg-neutral-800">
			<div>{tag?.name}</div>
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
