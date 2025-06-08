import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import React from "react"
import { useTask } from "../../_hook/use-task"

export default function TaskAssigned() {
	const { task } = useTask()

	if (!task.id_assigned) return <></>
	return (
		<div className="flex items-center gap-1">
			<Avatar>
				<AvatarFallback>T</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>C</AvatarFallback>
			</Avatar>
		</div>
	)
}
