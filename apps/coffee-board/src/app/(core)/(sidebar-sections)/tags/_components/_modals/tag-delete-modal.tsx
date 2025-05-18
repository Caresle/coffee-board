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
import { useTagDeleteStore } from "../../_states/tag-delete.state"

export default function TagDeleteModal() {
	const { show, update } = useTagDeleteStore(state => state)

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center text-red-500">
						<Icons.Misc.Tags />
						Delete Tag
					</DialogTitle>
					<DialogDescription>This action can not be undone</DialogDescription>
				</DialogHeader>
				Are you sure you want to delete this tag?
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button variant={"destructive"}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
