import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useTaskStore } from "../../_states/task.state"
import { useBoard } from "../../_hook/use-board"

export default function BoardHeader() {
	const { boardDetail } = useBoard()
	const { update } = useTaskStore.getState()

	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-bold capitalize">{boardDetail.name}</h2>
			<div>
				<TooltipBasic title="Options">
					<Button variant={"ghost"}>
						<Icons.Misc.Menu className="size-5" />
					</Button>
				</TooltipBasic>

				<TooltipBasic title="Add">
					<Button variant={"ghost"} onClick={() => update({ show: true })}>
						<Icons.Actions.Add className="size-5" />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
