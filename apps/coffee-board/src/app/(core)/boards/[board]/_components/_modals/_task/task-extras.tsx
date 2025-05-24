import React from "react"
import TaskExtraSection from "./task-extra-section"

export default function TaskExtras() {
	return (
		<div className="flex flex-col gap-2">
			<TaskExtraSection />
			<TaskExtraSection />
			<TaskExtraSection />
		</div>
	)
}
