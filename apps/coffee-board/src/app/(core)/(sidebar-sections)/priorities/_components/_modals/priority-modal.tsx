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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { usePriorityStore } from "../../_states/priority.state"
import priorityService from "@/services/priority.service"
import { Priority } from "@/entities/priority.entity"
import { queryKeys } from "@/constants/queryKeys"

export default function PriorityModal() {
	const { show, update, isEdit, item } = usePriorityStore(state => state)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: async (priority: Priority) => {
			if (isEdit) {
				return priorityService.updatePriority(priority)
			}

			return priorityService.createPriority(priority)
		},
		onMutate: async newPriority => {
			await queryClient.cancelQueries({
				queryKey: [queryKeys.priorities],
			})

			const previousPriorities = queryClient.getQueryData<Priority[]>([
				queryKeys.priorities,
			])

			const newPriorities = isEdit
				? previousPriorities?.map(priority => {
						if (priority.id === newPriority.id) {
							return { ...priority, ...newPriority }
						}
						return priority
				  })
				: [...(previousPriorities ?? []), newPriority]

			console.log(newPriorities)
			queryClient.setQueryData<Priority[]>(
				[queryKeys.priorities],
				newPriorities,
			)

			return { previousPriorities }
		},
		onError: (err, newPriority, context) => {
			queryClient.setQueryData<Priority[]>(
				[queryKeys.priorities],
				context?.previousPriorities,
			)
		},
		onSuccess: () => {
			update({ show: false, item: {} as Priority, isEdit: false })
			if (isEdit) {
				toast.success("Priority updated successfully")
				return
			}
			toast.success("Priority created successfully")
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.priorities],
			})
		},
	})

	const onSubmit = () => {
		mut.mutate(item)
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
						<Input
							disabled={mut.isPending}
							placeholder="Name"
							value={item?.name ?? ""}
							onChange={e =>
								update({ item: { ...item, name: e.target.value } })
							}
						/>
					</FormItem>
					<FormItem title="Order">
						<Input
							disabled={mut.isPending}
							placeholder="Order"
							type="number"
							min="0"
							step={0.1}
							value={item?.value ?? ""}
							onChange={e =>
								update({ item: { ...item, value: +e.target.value } })
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
