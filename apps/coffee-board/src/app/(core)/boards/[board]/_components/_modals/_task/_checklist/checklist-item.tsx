import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { TaskCheckList, TaskCheckListDetails } from "@/entities/task.entity"
import { cn } from "@/lib/utils"
import taskService from "@/services/task.service"
import { useMutation } from "@tanstack/react-query"
import { useChecklistTaskContext } from "../../../../_hook/use-checklist"

export default function CheckListItem({
	detail,
	checklist,
}: {
	detail: TaskCheckListDetails
	checklist: TaskCheckList
}) {
	const { QSubChecklist } = useChecklistTaskContext()

	const mut = useMutation({
		mutationFn: () => taskService.removeChecklistItem(detail.id, checklist),
		onSuccess: () => {
			QSubChecklist.refetch()
		},
	})

	const onDelete = () => {
		mut.mutate()
	}

	return (
		<div
			className={cn(
				"flex items-center gap-2 p-2 dark:bg-neutral-900 rounded-lg bg-slate-100 justify-between",
				{
					"line-through opacity-60": detail.completed,
				},
			)}
		>
			<div className="flex items-center gap-2">
				<Checkbox checked={detail.completed} />
				<div>{detail.name}</div>
			</div>
			<TooltipBasic title="Delete Item">
				<Button variant={"ghost"} onClick={onDelete} size={"sm"}>
					<Icons.Actions.Delete className="size-5" />
				</Button>
			</TooltipBasic>
		</div>
	)
}
