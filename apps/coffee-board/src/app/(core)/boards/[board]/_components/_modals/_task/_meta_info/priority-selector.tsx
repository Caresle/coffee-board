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
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import priorityService from "@/services/priority.service"
import { useMemo } from "react"

export default function PrioritySelector() {
	const { item, show } = useTaskStore(state => state)

	const QPriorities = useQuery({
		queryKey: [queryKeys.priorities],
		queryFn: priorityService.getPriorities,
		enabled: show,
	})

	const priorities = useMemo(() => QPriorities?.data || [], [QPriorities])

	return (
		<GeneralSelector icon={<Icons.Misc.UpDown />} title="Priority">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} className="w-full">
						{item?.priority?.name ?? "Priority"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{priorities.map(priority => (
						<DropdownMenuItem key={priority.id}>
							{priority.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</GeneralSelector>
	)
}
