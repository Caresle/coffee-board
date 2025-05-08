import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"

export default function BoardHeader() {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-xl font-bold">In progress</h2>
			<div>
				<TooltipBasic title="Options">
					<Button variant={"ghost"}>
						<Icons.Misc.Menu className="size-5" />
					</Button>
				</TooltipBasic>

				<TooltipBasic title="Add">
					<Button variant={"ghost"}>
						<Icons.Actions.Add className="size-5" />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
