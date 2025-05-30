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
import { useDeleteTaskStore } from "../../_states/delete-task.state"

export default function DeleteTaskModal() {
	const { show, update } = useDeleteTaskStore(state => state)

	const onSubmit = () => {
		// mut.mutate()
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center text-red-500">
						<Icons.Misc.Books />
						Delete Task
					</DialogTitle>
					<DialogDescription>
						This action will delete the task
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button onClick={onSubmit} variant={"destructive"}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
