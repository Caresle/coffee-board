import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"

export default function TaskHeader() {
	return (
		<div className="flex justify-between items-center">
			<h3>Test</h3>
			<div className="flex items-center gap-2">
				<TooltipBasic title="Options">
					<Button variant={"ghost"}>
						<Icons.Misc.Menu className="size-5" />
					</Button>
				</TooltipBasic>
			</div>
		</div>
	)
}
