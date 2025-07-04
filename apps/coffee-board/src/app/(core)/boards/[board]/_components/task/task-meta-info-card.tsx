import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import React from "react"
import { useTask } from "../../_hook/use-task"

export default function TaskMetaInfoCard() {
	const { task } = useTask()
	return (
		<div>
			{task.description && (
				<TooltipBasic title="Description">
					<Button variant={"ghost"}>
						<Icons.Misc.AlignLeft className="size-5" />
					</Button>
				</TooltipBasic>
			)}

			{task.attachments?.length > 0 && (
				<>
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
				</>
			)}
		</div>
	)
}
