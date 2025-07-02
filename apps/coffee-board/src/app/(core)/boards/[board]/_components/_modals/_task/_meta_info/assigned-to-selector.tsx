import Icons from "@/components/shared/icons"
import React from "react"
import GeneralSelector from "../general-selector"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export default function AssignedToSelector() {
	return (
		<GeneralSelector
			icon={<Icons.Misc.Users />}
			title="Assignees"
			triggerText="Assigned to"
		>
			<Popover>
				<PopoverTrigger asChild>
					<Button className="w-full" variant={"ghost"}>
						Assigned to
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Command>
						<CommandInput placeholder="Search User" />
						<CommandList>
							<CommandEmpty>No users found</CommandEmpty>
							<CommandGroup></CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</GeneralSelector>
	)
}
