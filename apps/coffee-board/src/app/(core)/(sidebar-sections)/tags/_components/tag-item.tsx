import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useTagStore } from "../_states/tag.state"
import { useTagDeleteStore } from "../_states/tag-delete.state"

export default function TagItem({ tag }: { tag: string }) {
	const { update } = useTagStore(state => state)
	const { update: udpateDelete } = useTagDeleteStore(state => state)

	return (
		<div
			key={tag}
			className="bg-white rounded-lg p-2 border flex items-center justify-between"
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
						onClick={() => udpateDelete({ show: true })}
					>
						<Icons.Actions.Delete />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
