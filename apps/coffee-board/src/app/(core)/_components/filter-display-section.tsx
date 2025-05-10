import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"

export default function FilterDisplaySection() {
	return (
		<div className="flex items-end gap-1">
			<Button className="flex items-center gap-2" variant={"underline-hidden"}>
				<Icons.Actions.File />
				Overview
			</Button>

			<Button className="flex items-center gap-2" variant={"underline-active"}>
				<Icons.Misc.Dashboard />
				Board
			</Button>

			<Button className="flex items-center gap-2" variant={"underline-hidden"}>
				<Icons.Misc.Calendar />
				Calendar
			</Button>
		</div>
	)
}
