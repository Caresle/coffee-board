import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import TaskDeleteButton from "./task-delete-button"

const TaskDropdownMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<TaskDeleteButton />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default function TaskHeader() {
	return (
		<div className="flex justify-between items-center">
			<h3>Test</h3>
			<div className="flex items-center gap-2">
				<TaskDropdownMenu />
			</div>
		</div>
	)
}
