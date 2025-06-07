"use client"
import Icons from "@/components/shared/icons"
import TooltipBasic from "@/components/shared/tooltip-basic"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"

export default function BoardMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {}}
					className="text-purple-500 hover:text-purple-600"
				>
					<Icons.Misc.Archive className="text-purple-500 hover:text-purple-600" />
					Archive
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {}}
					className="text-red-500 hover:text-red-600"
				>
					<Icons.Actions.Delete className="text-red-500 hover:text-red-600" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
