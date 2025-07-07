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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import tagService from "@/services/tag.service"
import { Tag } from "@/entities/tag.entity"
import { toast } from "sonner"
import { queryKeys } from "@/constants/queryKeys"

export default function TagDeleteModal() {
	const { show, update, item } = useTagDeleteStore(state => state)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: tagService.deleteTag,
		onSuccess: () => {
			update({ show: false, item: {} as Tag })
			toast.success("Tag deleted successfully")
		},
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: [queryKeys.tags],
			})

			const previousTags = queryClient.getQueryData<Tag[]>([queryKeys.tags])

			const newTags = previousTags?.filter(tag => tag.id !== item.id)

			queryClient.setQueryData<Tag[]>([queryKeys.tags], newTags)

			return { previousTags }
		},
		onError: (err, newTag, context) => {
			queryClient.setQueryData<Tag[]>([queryKeys.tags], context?.previousTags)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.tags],
			})
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
