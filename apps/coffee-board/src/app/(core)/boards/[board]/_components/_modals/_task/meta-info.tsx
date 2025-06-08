import React from "react"
import GeneralSelector from "./general-selector"
import Icons from "@/components/shared/icons"
import PrioritySelector from "./_meta_info/priority-selector"
import DatesSelector from "./_meta_info/dates-selector"

export default function MetaInfo() {
	return (
		<div className="grid grid-cols-2 gap-2 px-2">
			<div className="flex flex-col gap-2 col-span-1">
				<GeneralSelector
					icon={<Icons.Misc.Users />}
					title="Assignees"
					triggerText="Assigned to"
				/>
				<DatesSelector />
			</div>

			<div className="flex flex-col gap-2 col-span-1">
				<PrioritySelector />
				<GeneralSelector
					icon={<Icons.Misc.Tags />}
					title="Tags"
					triggerText="Add Tags"
				/>
			</div>
		</div>
	)
}
