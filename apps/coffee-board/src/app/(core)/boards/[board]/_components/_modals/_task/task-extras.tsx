import React from "react"
import TaskChecklistSection from "./task-checklist-section"
import { useTaskStore } from "../../../_states/task.state"
import { CheckListTaskProvider } from "../../../_hook/use-checklist"

export default function TaskExtras() {
	const { item } = useTaskStore(state => state)

	const checklist = item?.checklist || []

	if (checklist.length === 0) return <></>

	return (
		<div className="flex flex-col gap-2">
			{checklist.map((check, index) => (
				<CheckListTaskProvider checklist={check} key={index}>
					<TaskChecklistSection />
				</CheckListTaskProvider>
			))}
		</div>
	)
}
