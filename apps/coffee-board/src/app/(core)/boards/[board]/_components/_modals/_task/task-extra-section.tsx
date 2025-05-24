import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"

export default function TaskExtraSection() {
	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold text-lg">Checklist</h3>
			<div className="w-full">
				<Button
					variant={"secondary"}
					className="w-full flex justify-start items-center"
				>
					<Icons.Actions.Add />
					Add Checklist
				</Button>
			</div>
		</div>
	)
}
