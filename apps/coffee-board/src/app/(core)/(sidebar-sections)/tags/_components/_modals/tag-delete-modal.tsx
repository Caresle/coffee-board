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
import { useMutation } from "@tanstack/react-query"
import tagService from "@/services/tag.service"
import { Tag } from "@/entities/tag.entity"
import { toast } from "sonner"
import { useTags } from "../../_hook/use-tags"

export default function TagDeleteModal() {
	const { show, update, item } = useTagDeleteStore(state => state)
	const { QTags } = useTags()

	const mut = useMutation({
		mutationFn: tagService.deleteTag,
		onSuccess: () => {
			QTags.refetch()
			update({ show: false, item: {} as Tag })
			toast.success("Tag deleted successfully")
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
					<Button
						variant={"destructive"}
						onClick={onSubmit}
						disabled={mut.isPending}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
