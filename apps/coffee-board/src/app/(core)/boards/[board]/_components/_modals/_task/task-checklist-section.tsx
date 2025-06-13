import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React, { useRef, useState } from "react"
import { useChecklistTaskContext } from "../../../_hook/use-checklist"
import { TaskCheckList, TaskCheckListDetails } from "@/entities/task.entity"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import NewChecklistItemInput from "./_checklist/new-checklist-item-input"
import { useMutation } from "@tanstack/react-query"
import taskService from "@/services/task.service"

const CheckListItem = ({ detail }: { detail: TaskCheckListDetails }) => {
	return (
		<div
			className={cn(
				"flex items-center gap-2 p-2 dark:bg-neutral-900 rounded-lg bg-slate-100",
				{
					"line-through opacity-60": detail.completed,
				},
			)}
		>
			<Checkbox checked={detail.completed} />
			<div>{detail.name}</div>
		</div>
	)
}

const AddCheckListItemButton = ({
	setNewChecklist,
}: {
	setNewChecklist: (val: boolean) => void
}) => {
	const onClick = () => {
		setNewChecklist(true)
		setTimeout(() => {
			const el = document.getElementById("new-checklist-item-input")
			if (el) el.focus()
		}, 100)
	}
	return (
		<div className="w-full">
			<Button
				onClick={onClick}
				variant={"ghost"}
				className="w-full flex justify-start items-center"
			>
				<Icons.Actions.Add />
				Add Item
			</Button>
		</div>
	)
}

export default function TaskChecklistSection() {
	const { header, details } = useChecklistTaskContext()
	const [newChecklist, setNewChecklist] = useState(false)

	const mut = useMutation({
		mutationFn: taskService.addChecklistItem,
		onSuccess: () => {
			setNewChecklist(false)
		},
	})

	const onSubmit = (name: string) => {
		const newDetail: TaskCheckList = {
			header,
			details: [
				{
					id: 0,
					id_checklist: header.id,
					name,
					completed: false,
					level: 1,
					id_parent: null,
				},
			],
		}

		mut.mutate(newDetail)
	}

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold text-lg">{header.name}</h3>
			<div className="flex flex-col gap-2">
				{details.map((detail, index) => (
					<CheckListItem key={index} detail={detail} />
				))}
				{!newChecklist && (
					<AddCheckListItemButton setNewChecklist={setNewChecklist} />
				)}
				{newChecklist && (
					<NewChecklistItemInput
						onBlur={() => setNewChecklist(false)}
						onSubmit={onSubmit}
					/>
				)}
			</div>
		</div>
	)
}
