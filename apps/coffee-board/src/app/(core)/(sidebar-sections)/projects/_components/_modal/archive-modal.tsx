import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import Icons from "@/components/shared/icons"
import { useArchiveProjectStore } from "../../_states/archive-project.state"

export default function ArchiveModal() {
	const { show, update } = useArchiveProjectStore(state => state)

	const onSubmit = () => {
		// mut.mutate()
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.Archive />
						Archive Project
					</DialogTitle>
					<DialogDescription>
						This action will archive the project and remove it from the projects
						list
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button onClick={onSubmit}>Archive</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
