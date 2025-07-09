import { Board, BoardVisibility } from "@/entities/board.entity"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import boardService from "@/services/board.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icons from "../icons"
import { queryKeys } from "@/constants/queryKeys"
import { INVALID_ID } from "@/constants/invalid-id"
import { toast } from "sonner"

export default function AddBoardButton({ projectId }: { projectId: number }) {
	const [isNew, setIsNew] = useState(false)
	const [boardName, setBoardName] = useState("")
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: (body: Omit<Board, "id">) => boardService.create(body),
		onMutate: async (newBoard: Board) => {
			await queryClient.cancelQueries({
				queryKey: [queryKeys.boards, { id: projectId }],
			})

			const previousData = queryClient.getQueryData<Board[]>([
				queryKeys.boards,
				{ id: projectId },
			])

			const newData = [...(previousData ?? []), newBoard]

			queryClient.setQueryData<Board[]>(
				[queryKeys.boards, { id: projectId }],
				newData,
			)

			return { previousData }
		},
		onSuccess: () => {
			toast.success("Board created successfully")
		},
		onError: (err, newBoard, context) => {
			queryClient.setQueryData<Board[]>(
				[queryKeys.boards, { id: projectId }],
				context?.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.boards, { id: projectId }],
			})
		},
	})

	const handleAddBoard = () => {
		setIsNew(true)
		setTimeout(() => {
			const input = document.getElementById("new-board-input")
			if (input) {
				input.focus()
			}
		}, 100)
	}

	const onSubmit = () => {
		setBoardName("")
		setIsNew(false)

		const board: Board = {
			id: INVALID_ID.boardTreeItem,
			id_project: projectId,
			name: boardName,
			description: null,
			deleted: 0,
			visibility: BoardVisibility.PRIVATE,
			details: [],
		}

		mut.mutate(board)
	}

	return (
		<>
			{!isNew && (
				<Button
					variant="ghost"
					className="w-full flex items-center justify-start gap-2"
					onClick={handleAddBoard}
				>
					<Icons.Actions.Add className="size-5" />
					Add board
				</Button>
			)}
			{isNew && (
				<div className="flex items-center gap-2">
					<Input
						id={"new-board-input"}
						value={boardName}
						placeholder="Board name"
						onBlur={() => setIsNew(false)}
						onChange={e => setBoardName(e.target.value)}
						onKeyDown={e => {
							if (e.key === "Enter") {
								onSubmit()
							}
						}}
					/>
				</div>
			)}
		</>
	)
}
