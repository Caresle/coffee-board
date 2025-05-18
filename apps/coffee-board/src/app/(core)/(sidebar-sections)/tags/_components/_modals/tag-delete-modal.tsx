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
import { useTagDeleteStore } from "../../_states/tag-delete.state"

export default function TagDeleteModal() {
	const { show, update } = useTagDeleteStore(state => state)

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[35%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.Box />
						Share Project
					</DialogTitle>
					<DialogDescription>Share your project with others</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-2">
					<FormItem title="Add people">
						<Input placeholder="Email, username, or phone number" />
					</FormItem>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"}>Cancel</Button>
					</DialogClose>
					<Button>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
