import React from "react"
import TaskChecklistSection from "./task-checklist-section"
import { useTaskStore } from "../../../_states/task.state"
import { CheckListTaskProvider } from "../../../_hook/use-checklist"
import { Button } from "@/components/ui/button"
import Icons from "@/components/shared/icons"

const AddCheckListButton = () => {
	return (
		<div className="w-full">
			<Button
				variant={"secondary"}
				className="w-full flex justify-start items-center"
			>
				<Icons.Actions.Add />
				Add Checklist
			</Button>
		</div>
	)
}

/**
 * This component is used to display right now the multiple checklists that
 * a single task can have.
 */
export default function TaskExtras() {
	const { item } = useTaskStore(state => state)

	const checklist = item?.checklist || []

	if (checklist.length === 0)
		return (
			<>
				<AddCheckListButton />
			</>
		)

	return (
		<div className="flex flex-col gap-2">
			{checklist.map((check, index) => (
				<CheckListTaskProvider checklist={check} key={index}>
					<TaskChecklistSection />
				</CheckListTaskProvider>
			))}
			<AddCheckListButton />
		</div>
	)
}
