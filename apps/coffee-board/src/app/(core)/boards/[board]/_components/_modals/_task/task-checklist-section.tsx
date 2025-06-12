import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import React from "react"
import { useChecklistTaskContext } from "../../../_hook/use-checklist"
import { TaskCheckListDetails } from "@/entities/task.entity"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

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

export default function TaskChecklistSection() {
	const { header, details } = useChecklistTaskContext()

	return (
		<div className="flex flex-col gap-2">
			<h3 className="font-semibold text-lg">{header.name}</h3>
			<div className="flex flex-col gap-2">
				{details.map((detail, index) => (
					<CheckListItem key={index} detail={detail} />
				))}
			</div>
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
