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
import { usePriorityDeleteStore } from "../../_states/priority-delete.state"
import { useMutation } from "@tanstack/react-query"
import priorityService from "@/services/priority.service"
import { Priority } from "@/entities/priority.entity"
import { usePriority } from "../../_hook/use-priority"

export default function PriorityDeleteModal() {
	const { QPriority } = usePriority()
	const { show, update, item } = usePriorityDeleteStore(state => state)

	const mut = useMutation({
		mutationFn: () => priorityService.deletePriority(item.id),
		onSuccess: () => {
			QPriority.refetch()
			update({ show: false, item: {} as Priority })
		},
	})

	const onSubmit = () => {
		mut.mutate()
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center text-red-500">
						<Icons.Misc.UpDown />
						Delete Priority
					</DialogTitle>
					<DialogDescription>This action can not be undone</DialogDescription>
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
