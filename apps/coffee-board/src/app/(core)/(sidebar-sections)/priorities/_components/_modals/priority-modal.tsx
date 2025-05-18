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
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { usePriorityStore } from "../../_states/priority.state"

export default function PriorityModal() {
	const { show, update, isEdit } = usePriorityStore(state => state)

	const mut = useMutation({
		mutationFn: () => Promise.resolve(),
		onSuccess: () => {
			update({ show: false })
			if (isEdit) {
				toast.success("Priority updated successfully")
				return
			}
			toast.success("Priority created successfully")
		},
	})

	const onSubmit = () => {
		// mut.mutate()
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.UpDown />
						{isEdit ? "Edit Priority" : "Create Priority"}
					</DialogTitle>
					<DialogDescription>
						Create custom tags for your projects
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-2">
					<FormItem title="Name">
						<Input placeholder="Name" />
					</FormItem>
					<FormItem title="Order">
						<Input placeholder="Order" type="number" min="0" step={0.1} />
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
