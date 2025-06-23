import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useViewSection } from "../../_hook/use-view-section"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import boardDetailsService from "@/services/boardDetails.service"
import { useBoardGlobal } from "@/hooks/use-board-global"
import { queryKeys } from "@/constants/queryKeys"

export default function BoardNewInput() {
	const [name, setName] = useState("")
	const { setIsNewBoard } = useViewSection()
	const { selectedBoard, setSelectedBoard } = useBoardGlobal()
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: boardDetailsService.create,
		onSuccess: data => {
			setIsNewBoard(false)
			setName("")
			queryClient.invalidateQueries({
				queryKey: [queryKeys.boards, { id: selectedBoard?.id_project }],
			})

			const details = selectedBoard?.details || []

			if (!data) return

			const newDetails = [...details, data]

			if (!selectedBoard) return

			console.log(selectedBoard)
			console.log(newDetails)

			setSelectedBoard({
				...selectedBoard,
				details: newDetails,
			})
		},
	})

	const onSubmit = () => {
		if (name.trim().length <= 0) return

		mut.mutate({
			id_board: selectedBoard?.id ?? 0,
			name,
			board_order: 0,
			deleted: 0,
		})
	}

	return (
		<div className="dark:bg-neutral-900 p-2 h-fit rounded-lg bg-white border dark:border-neutral-700">
			<Input
				id="board-name"
				placeholder="Board detail"
				value={name}
				onChange={e => setName(e.target.value)}
				onBlur={() => setIsNewBoard(false)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						onSubmit()
					}
				}}
			/>
		</div>
	)
}
