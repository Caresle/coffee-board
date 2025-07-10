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
import { useDeleteTaskStore } from "../../_states/delete-task.state"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/task.service"
import { Task } from "@/entities/task.entity"
import { queryKeys } from "@/constants/queryKeys"

export default function DeleteTaskModal() {
	const { show, update, item } = useDeleteTaskStore(state => state)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: taskService.delete,
		onMutate: async (id: number) => {
			const queryKey = [queryKeys.tasks, { id: item.id_board_det }]
			await queryClient.cancelQueries({
				queryKey,
			})

			const previousData = queryClient.getQueryData<Task[]>(queryKey)

			const newData = previousData?.filter(task => task.id !== id)

			queryClient.setQueryData<Task[]>(queryKey, newData)

			return { previousData }
		},
		onSuccess: () => {
			update({ show: false, item: {} as Task })
		},
		onError: (err, id, context) => {
			queryClient.setQueryData<Task[]>(
				[queryKeys.tasks, { id: item.id_board_det }],
				context?.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.tasks, { id: item.id_board_det }],
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
						<Icons.Misc.Books />
						Delete Task
					</DialogTitle>
					<DialogDescription>
						This action will delete the task
					</DialogDescription>
				</DialogHeader>

				<p>Are you sure you want to delete this task?</p>
				<div className="bg-slate-100 p-2 rounded-lg border dark:bg-neutral-900 dark:border-neutral-800">
					<div className="bg-white rounded-lg p-2 border dark:bg-neutral-800 dark:border-neutral-700">
						{item.name}
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"secondary"} disabled={mut.isPending}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={onSubmit}
						variant={"destructive"}
						disabled={mut.isPending}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
