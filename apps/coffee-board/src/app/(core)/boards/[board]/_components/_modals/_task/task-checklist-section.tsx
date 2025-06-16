import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useChecklistTaskContext } from "../../../_hook/use-checklist"
import { TaskCheckList, TaskCheckListDetails } from "@/entities/task.entity"
import NewChecklistItemInput from "./_checklist/new-checklist-item-input"
import { useMutation } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import CheckListItem from "./_checklist/checklist-item"

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
	const { header, details, QSubChecklist } = useChecklistTaskContext()
	const [newChecklist, setNewChecklist] = useState(false)

	const mut = useMutation({
		mutationFn: taskService.addChecklistItem,
		onSuccess: () => {
			QSubChecklist.refetch()
			setNewChecklist(false)
		},
	})

	const mutDelete = useMutation({
		mutationFn: taskService.removeChecklistHeader,
		onSuccess: () => {
			QSubChecklist.refetch()
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

	const onDelete = () => {
		mutDelete.mutate(header)
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between items-center">
				<h3 className="font-semibold text-lg">{header.name}</h3>
				<Button
					variant={"destructive"}
					size={"icon"}
					onClick={onDelete}
					disabled={mutDelete.isPending}
				>
					<Icons.Actions.Delete className="size-5" />
				</Button>
			</div>
			<div className="flex flex-col gap-2">
				{details.map((detail, index) => (
					<CheckListItem
						key={index}
						detail={detail}
						checklist={{ header, details }}
					/>
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
