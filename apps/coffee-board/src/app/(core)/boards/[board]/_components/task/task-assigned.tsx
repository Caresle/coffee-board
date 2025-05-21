import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import React from "react"

export default function TaskAssigned() {
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
