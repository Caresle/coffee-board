import React from "react"
import GeneralSelector from "./general-selector"
import Icons from "@/components/shared/icons"

export default function MetaInfo() {
	return (
		<div className="grid grid-cols-2 gap-2 px-2">
			<div className="flex flex-col gap-2 col-span-1">
				<GeneralSelector
					icon={<Icons.Misc.Users />}
					title="Assignees"
					triggerText="Assigned to"
				/>
				<GeneralSelector
					icon={<Icons.Misc.Calendar />}
					title="Dates"
					triggerText="From -> To"
				/>
			</div>
			<div className="flex flex-col gap-2 col-span-1">
				<GeneralSelector
					icon={<Icons.Misc.UpDown />}
					title="Priority"
					triggerText="High -> Low"
				/>
				<GeneralSelector
					icon={<Icons.Misc.Tags />}
					title="Tags"
					triggerText="Add Tags"
				/>
			</div>
		</div>
	)
}
