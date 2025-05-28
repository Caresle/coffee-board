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
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import ColorSelector from "../color-selector"
import tagService from "@/services/tag.service"
import { Tag } from "@/entities/tag.entity"
import { useTags } from "../../_hook/use-tags"

export default function TagModal() {
	const { show, update, isEdit, item } = useTagStore(state => state)
	const { QTags } = useTags()

	const mut = useMutation({
		mutationFn: (data: Tag) => {
			if (isEdit) {
				return tagService.updateTag(data)
			}
			return tagService.createTag(data)
		},
		onSuccess: () => {
			QTags.refetch()
			update({ show: false, item: {} as Tag, isEdit: false })
			if (isEdit) {
				toast.success("Tag updated successfully")
				return
			}
			toast.success("Tag created successfully")
		},
	})

	const onSubmit = () => {
		if (!item.color) {
			item.color = "#000000"
		}
		mut.mutate(item)
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
				<form className="flex flex-col gap-2">
					<FormItem title="Name">
						<Input
							disabled={mut.isPending}
							placeholder="Name"
							value={item.name ?? ""}
							onChange={e =>
								update({ item: { ...item, name: e.target.value } })
							}
						/>
					</FormItem>
					<ColorSelector disabled={mut.isPending} />
				</form>
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
