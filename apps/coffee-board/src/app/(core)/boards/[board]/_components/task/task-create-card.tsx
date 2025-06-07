import React, { useState } from "react"
import { useBoard } from "../../_hook/use-board"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import { queryKeys } from "@/constants/queryKeys"

export default function TaskCreateCard() {
	const { setIsNewTask, boardDetail } = useBoard()
	const [name, setName] = useState("")
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: taskService.createQuickTask,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [
					queryKeys.tasks,
					{
						id: boardDetail.id,
					},
				],
			})
			setIsNewTask(false)
		},
	})

	const onSubmit = () => {
		if (name.length === 0) {
			setIsNewTask(false)
			return
		}

		mut.mutate({
			name,
			id_board_det: boardDetail.id,
		})
	}

	return (
		<div className="bg-white p-2 rounded-lg dark:bg-neutral-800 border dark:border-neutral-700">
			<Input
				id="new-task-input"
				value={name}
				onKeyDown={e => {
					if (e.key === "Enter") {
						onSubmit()
					}
				}}
				onChange={e => setName(e.target.value)}
				onBlur={() => {
					if (name.length > 0) {
						return
					}
					setIsNewTask(false)
				}}
				placeholder="Task name"
			/>
		</div>
	)
}
