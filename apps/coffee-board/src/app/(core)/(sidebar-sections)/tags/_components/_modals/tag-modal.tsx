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

export default function TagModal() {
	const { show, update, isEdit, item } = useTagStore(state => state)

	const mut = useMutation({
		mutationFn: () => Promise.resolve(),
		onSuccess: () => {
			update({ show: false })
			if (isEdit) {
				toast.success("Tag updated successfully")
				return
			}
			toast.success("Tag created successfully")
		},
	})

	const onSubmit = () => {
		console.log(item)
		// mut.mutate()
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
							placeholder="Name"
							value={item.name}
							onChange={e =>
								update({ item: { ...item, name: e.target.value } })
							}
						/>
					</FormItem>
					<FormItem title="Color">
						<Input
							placeholder="Color"
							type="color"
							value={item.color}
							onChange={e =>
								update({ item: { ...item, color: e.target.value } })
							}
						/>
					</FormItem>
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
