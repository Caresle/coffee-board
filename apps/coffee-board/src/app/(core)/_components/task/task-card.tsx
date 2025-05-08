import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import React from "react"
import TaskHeader from "./task-header"
import TaskAssigned from "./task-assigned"

export default function TaskCard() {
	return (
		<div className="flex gap-1 border rounded-lg p-2 bg-white flex-col transition-all ring-0 ring-orange-500 hover:ring-2">
			<TaskHeader />
			<Separator />
			<TaskAssigned />

			<div>
				<div className="bg-red-50 w-fit text-red-500 rounded-sm px-2 py-1 text-xs">
					High Priority
				</div>
			</div>
		</div>
	)
}
