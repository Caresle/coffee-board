import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import ArchiveProjectButton from "./archive-project-button"

export default function ProjectActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"secondary"}>
					<Icons.Misc.Menu />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<ArchiveProjectButton />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
