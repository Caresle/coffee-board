import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEventPopoverStore } from "@/states/event-popover.state"
import React from "react"

export default function EventPopoverContent() {
	const { update } = useEventPopoverStore.getState()

	return (
		<div>
			<div>
				<div className="flex items-center justify-between w-full">
					<Button variant={"ghost"} size={"icon"}>
						<Icons.Misc.AlignLeft />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => update({ show: false })}
					>
						<Icons.Actions.Close />
					</Button>
				</div>
				<div className="h-[200px] p-2 flex flex-col gap-2 justify-start">
					<Input placeholder="Write a title" />
					<Button
						variant={"ghost"}
						className="flex items-center gap-2 justify-start"
					>
						<Icons.Misc.Clip className="size-5" />
						Time
					</Button>
					<Button
						variant={"ghost"}
						className="flex items-center gap-2 justify-start"
					>
						<Icons.Misc.Users className="size-5" />
						User
					</Button>
				</div>
				<div className="p-2 flex items-center justify-end gap-2">
					<Button variant={"ghost"}>Options</Button>
					<Button>Save</Button>
				</div>
			</div>
		</div>
	)
}
