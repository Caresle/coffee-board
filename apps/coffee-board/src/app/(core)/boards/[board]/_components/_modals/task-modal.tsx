import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import Icons from "@/components/shared/icons"
import { useTaskStore } from "../../_states/task.state"
import TaskName from "./_task/task-name"
import MetaInfo from "./_task/meta-info"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import TaskExtras from "./_task/task-extras"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TaskModal() {
	const { show, update } = useTaskStore(state => state)

	const onSubmit = () => {
		// mut.mutate()
	}

	return (
		<Dialog open={show} onOpenChange={value => update({ show: value })}>
			<DialogContent className="max-w-none min-w-[75%]">
				<DialogHeader>
					<DialogTitle className="flex gap-2 items-center">
						<Icons.Misc.Books />
						Task
					</DialogTitle>
				</DialogHeader>
				<div className="h-[600px] grid grid-cols-12 divide-x overflow-y-auto">
					<div className="col-span-8 p-2 flex overflow-y-auto flex-col gap-2">
						<TaskName />
						<MetaInfo />
						<Separator />
						<Textarea placeholder="Description" rows={10} />
						<TaskExtras />
					</div>
					<div className="col-span-4 p-2 flex flex-col gap-2">
						<h2 className="text-lg font-semibold">Activity</h2>
						<div className="bg-slate-100 flex-1 rounded-lg"></div>
						<div className="flex items-center gap-2">
							<Input placeholder="Write a comment" />
							<Button>Send</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
