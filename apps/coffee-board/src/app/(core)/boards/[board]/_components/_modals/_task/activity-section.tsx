import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useTaskStore } from "../../../_states/task.state"
import Icons from "@/components/shared/icons"
import { useMutation } from "@tanstack/react-query"
import taskService from "@/services/task.service"

const WriteComment = () => {
	const { item } = useTaskStore(state => state)
	const [comment, setComment] = useState("")

	const mut = useMutation({
		mutationFn: ({ id_task, msg }: { id_task: number; msg: string }) =>
			taskService.createTaskHistory(id_task, msg),
		onSuccess: () => {
			setComment("")
		},
	})

	const onSubmit = () => {
		mut.mutate({
			id_task: item.id,
			msg: comment,
		})
	}

	return (
		<div className="flex items-center gap-2">
			<Input
				placeholder="Write a comment"
				onChange={e => setComment(e.target.value)}
				value={comment}
				onKeyDown={e => {
					if (e.key === "Enter") {
						onSubmit()
					}
				}}
				disabled={mut.isPending}
			/>
			<Button onClick={onSubmit} disabled={mut.isPending}>
				Send
			</Button>
		</div>
	)
}

export default function ActivitySection() {
	const { item } = useTaskStore(state => state)

	const activity = item.history || []

	return (
		<div className="col-span-4 p-2 flex flex-col gap-2 overflow-y-auto">
			<h2 className="text-lg font-semibold">Activity</h2>
			<div className="bg-slate-100 flex-1 rounded-lg dark:bg-neutral-900 flex flex-col gap-2 overflow-y-auto p-2">
				{activity.length <= 0 && (
					<div className="flex flex-col gap-2 dark:text-neutral-400 flex-1 justify-center items-center text-slate-500">
						<Icons.Misc.NoData className="size-28" />
						<p>No activity yet. Add a comment to get started.</p>
					</div>
				)}
				{activity.length > 0 &&
					activity.map((activity, index) => (
						<div
							key={index}
							className="dark:bg-neutral-800 p-2 rounded-lg bg-white"
						>
							<div className="text-sm font-semibold">Username</div>
							<p>{activity.message.msg}</p>
						</div>
					))}
			</div>
			<WriteComment />
		</div>
	)
}
