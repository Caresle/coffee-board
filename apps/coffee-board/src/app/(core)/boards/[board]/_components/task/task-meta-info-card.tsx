import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"

export default function TaskMetaInfoCard() {
	return (
		<div>
			<TooltipBasic title="Description">
				<Button variant={"ghost"}>
					<Icons.Misc.AlignLeft className="size-5" />
				</Button>
			</TooltipBasic>

			<TooltipBasic title="Files Added">
				<Button variant={"ghost"}>
					<Icons.Misc.Clip className="size-5" />
				</Button>
			</TooltipBasic>
			<TooltipBasic title="Image Added">
				<Button variant={"ghost"}>
					<Icons.Misc.Image className="size-5" />
				</Button>
			</TooltipBasic>
		</div>
	)
}
