import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import Icons from "../../icons"
import { useTreeItemDeleteStore } from "@/states/project-tree.state"
import { useMutation } from "@tanstack/react-query"
import boardService from "@/services/board.service"
import { Board } from "@/entities/board.entity"

export default function DeleteProjectItemModal() {
	const { show, update, item } = useTreeItemDeleteStore(state => state)

	const mut = useMutation({
		mutationFn: (id: number) => boardService.delete(id),
		onSuccess: () => {
			update({ show: false, item: {} as Board })
		},
	})

	const onSubmit = () => {
		mut.mutate(item.id)
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center text-red-500">
						<Icons.Misc.Books />
						Delete Item
					</DialogTitle>
				</DialogHeader>
				<div>Are you sure you want to delete this item?</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button
						onClick={onSubmit}
						disabled={mut.isPending}
						variant={"destructive"}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
