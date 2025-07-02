import Icons from "@/components/shared/icons"
import GeneralSelector from "../general-selector"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTaskStore } from "../../../../_states/task.state"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import priorityService from "@/services/priority.service"
import { useMemo } from "react"
import { Priority } from "@/entities/priority.entity"
import { Task } from "@/entities/task.entity"

export default function PrioritySelector() {
	const { item, show, update } = useTaskStore(state => state)
	const queryClient = useQueryClient()

	const QPriorities = useQuery({
		queryKey: [queryKeys.priorities],
		queryFn: priorityService.getPriorities,
		enabled: show,
	})

	const priorities = useMemo(() => QPriorities?.data || [], [QPriorities])

	const onUpdatePriority = (priority: Priority) => {
		const { id_board_det, id } = item

		const oldData =
			queryClient.getQueryData<Task[]>([
				queryKeys.tasks,
				{ id: id_board_det },
			]) || []

		const newData = oldData.map(task => {
			if (task.id === id) {
				const newTask = {
					...task,
					priority: priority,
					id_priority: priority.id,
				}
				update({ item: newTask })
				return newTask
			}
			return task
		})

		queryClient.setQueryData([queryKeys.tasks, { id: id_board_det }], newData)
	}

	return (
		<GeneralSelector icon={<Icons.Misc.UpDown />} title="Priority">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} className="w-full capitalize">
						{item?.priority?.name ?? "Priority"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{priorities.map(priority => (
						<DropdownMenuItem
							key={priority.id}
							className="capitalize"
							onClick={() => onUpdatePriority(priority)}
						>
							{priority.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</GeneralSelector>
	)
}
