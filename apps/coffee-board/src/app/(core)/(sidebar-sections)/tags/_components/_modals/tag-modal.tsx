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
import FormItem from "@/components/shared/form-item"
import { Input } from "@/components/ui/input"
import { useTagStore } from "../../_states/tag.state"
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"
import ColorSelector from "../color-selector"
import tagService from "@/services/tag.service"
import { Tag } from "@/entities/tag.entity"
import { queryKeys } from "@/constants/queryKeys"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer"

const TagForm = ({
	mut,
}: {
	mut: UseMutationResult<Tag | null, unknown, Tag, unknown>
}) => {
	const { update, item } = useTagStore(state => state)

	return (
		<form className="flex flex-col gap-2">
			<FormItem title="Name">
				<Input
					disabled={mut.isPending}
					placeholder="Name"
					value={item.name ?? ""}
					onChange={e => update({ item: { ...item, name: e.target.value } })}
				/>
			</FormItem>
			<ColorSelector disabled={mut.isPending} />
		</form>
	)
}

export default function TagModal() {
	const { show, update, isEdit, item } = useTagStore(state => state)
	const queryClient = useQueryClient()
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const mut = useMutation({
		mutationFn: (data: Tag) => {
			if (isEdit) {
				return tagService.updateTag(data)
			}
			return tagService.createTag(data)
		},
		onMutate: async newTag => {
			await queryClient.cancelQueries({
				queryKey: [queryKeys.tags],
			})

			const previousTags = queryClient.getQueryData<Tag[]>([queryKeys.tags])

			const newTags = isEdit
				? previousTags?.map(tag => {
						if (tag.id === newTag.id) {
							return { ...tag, ...newTag }
						}
						return tag
				  })
				: [...(previousTags ?? []), newTag]

			queryClient.setQueryData<Tag[]>([queryKeys.tags], newTags)

			return { previousTags }
		},
		onError: (err, newTag, context) => {
			queryClient.setQueryData<Tag[]>([queryKeys.tags], context?.previousTags)
		},
		onSuccess: () => {
			update({ show: false, item: {} as Tag, isEdit: false })
			if (isEdit) {
				toast.success("Tag updated successfully")
				return
			}
			toast.success("Tag created successfully")
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.tags],
			})
		},
	})

	const onSubmit = () => {
		if (!item.color) {
			item.color = "#000000"
		}
		mut.mutate(item)
	}

	if (!isDesktop) {
		return (
			<Drawer open={show} onOpenChange={value => update({ show: value })}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{isEdit ? "Edit Tag" : "Create Tag"}</DrawerTitle>
						<DrawerDescription>
							Create custom tags for your projects
						</DrawerDescription>
					</DrawerHeader>
					<div className="px-2">
						<TagForm mut={mut} />
					</div>
					<DrawerFooter>
						<Button onClick={onSubmit} disabled={mut.isPending}>
							Save
						</Button>
						<DrawerClose asChild>
							<Button variant={"secondary"}>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.Tags />
						{isEdit ? "Edit Tag" : "Create Tag"}
					</DialogTitle>
					<DialogDescription>
						Create custom tags for your projects
					</DialogDescription>
				</DialogHeader>
				<TagForm mut={mut} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button onClick={onSubmit} disabled={mut.isPending}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
