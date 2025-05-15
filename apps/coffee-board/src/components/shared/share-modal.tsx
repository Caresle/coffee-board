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
import { useShareStore } from "@/states/share.state"
import FormItem from "./form-item"
import { Input } from "../ui/input"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default function ShareModal() {
	const { show, update } = useShareStore(state => state)

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

					<FormItem title="General Access">
						<div>
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div className="flex items-center gap-2 rounded-lg px-2 py-1 justify-between cursor-pointer transition-all hover:bg-slate-100">
											<div className="flex items-center gap-1">
												<Icons.Misc.Component />
												Read
											</div>
											<Icons.Actions.DropdownClosed />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>Read</DropdownMenuItem>
										<DropdownMenuItem>Write</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
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
