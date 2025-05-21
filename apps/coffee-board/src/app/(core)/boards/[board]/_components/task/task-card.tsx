import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import React from "react"
import TaskHeader from "./task-header"
import TaskAssigned from "./task-assigned"
import { Button } from "@/components/ui/button"
import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import TaskMetaInfoCard from "./task-meta-info-card"
import TaskTagList from "./task-tag-list"

export default function TaskCard() {
	return (
		<div className="flex gap-1 border rounded-lg p-2 bg-white flex-col transition-all ring-0 ring-orange-500 hover:ring-2">
			<TaskHeader />
			<Separator />
			<TaskAssigned />

			<TaskTagList />
			<TaskMetaInfoCard />
		</div>
	)
}
