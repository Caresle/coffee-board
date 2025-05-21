import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"

export default function ProjectTitle() {
	return (
		<div className="flex items-center gap-2">
			<Icons.Misc.Box className="size-5" />
			<h2 className="text-2xl font-bold">Project 1</h2>
			<TooltipBasic title="Edit">
				<Button variant={"ghost"}>
					<Icons.Actions.Edit />
				</Button>
			</TooltipBasic>
		</div>
	)
}
