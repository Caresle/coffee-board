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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDetailDeleteStore } from "../../../_states/boardDetails.state"
import { Board, BoardDetails } from "@/entities/board.entity"
import { queryKeys } from "@/constants/queryKeys"
import { useBoardGlobal } from "@/hooks/use-board-global"
import boardDetailsService from "@/services/boardDetails.service"

export default function DeleteBoardModal() {
	const { show, update, item } = useDetailDeleteStore(state => state)
	const queryClient = useQueryClient()
	const { selectedBoard } = useBoardGlobal()

	const mut = useMutation({
		mutationFn: boardDetailsService.delete,
		onMutate: async (id: number) => {
			const queryKey = [queryKeys.boards, { id: selectedBoard?.id_project }]
			await queryClient.cancelQueries({
				queryKey,
			})

			const previousData = queryClient.getQueryData<Board[]>(queryKey)

			const newBoards = previousData?.map(board => {
				if (board.id !== item.id_board) return board

				board.details = board.details.filter(boardDet => boardDet.id !== id)

				return board
			})

			queryClient.setQueryData<Board[]>(queryKey, newBoards)

			return { previousData }
		},
		onSuccess: () => {
			update({ show: false, item: {} as BoardDetails })
		},
		onError: (err, id, context) => {
			queryClient.setQueryData<Board[]>(
				[queryKeys.boards, { id: selectedBoard?.id_project }],
				context?.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.boards, { id: selectedBoard?.id_project }],
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
						Delete Board
					</DialogTitle>
					<DialogDescription>
						This action will delete the board
					</DialogDescription>
				</DialogHeader>

				<p>Are you sure you want to delete this board?</p>
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
