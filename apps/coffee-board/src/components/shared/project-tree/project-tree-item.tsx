import { Board } from "@/entities/board.entity"
import Icons from "../icons"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useBoardGlobal } from "@/hooks/use-board-global"
import { useRouter } from "next/navigation"
import { useTreeItemDeleteStore } from "@/states/project-tree.state"
import {
	ProjectTreeItemProvider,
	useProjectTreeItem,
} from "@/hooks/use-project-tree-item"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { focusById } from "@/helpers/focusById"
import { FOCUS_IDS } from "@/constants/focus"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import boardService from "@/services/board.service"
import { queryKeys } from "@/constants/queryKeys"
import { toast } from "sonner"
import { INVALID_ID } from "@/constants/invalid-id"
import { cn } from "@/lib/utils"

const TreeItemActions = () => {
	const { update } = useTreeItemDeleteStore.getState()
	const { board, setIsRenaming } = useProjectTreeItem()

	const onRename = () => {
		setIsRenaming(true)
		focusById(FOCUS_IDS.projectTree.renaming)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={onRename}>
					<Icons.Actions.Edit className="size-5" />
					Rename
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Icons.Actions.Edit className="size-5" />
					Edit description
				</DropdownMenuItem>
				<DropdownMenuItem
					variant="destructive"
					onClick={() => update({ show: true, item: board })}
				>
					<Icons.Actions.Delete className="size-5" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const TreeItemRenaming = () => {
	const { isRenaming, setIsRenaming, board } = useProjectTreeItem()
	const [name, setName] = useState(board.name)
	const queryClient = useQueryClient()

	const mut = useMutation({
		mutationFn: boardService.update,
		onMutate: async (updated: Board) => {
			await queryClient.cancelQueries({
				queryKey: [queryKeys.boards, { id: board.id_project }],
			})

			const previousData = queryClient.getQueryData<Board[]>([
				queryKeys.boards,
				{ id: board.id_project },
			])

			const newData = previousData?.map(board => {
				if (board.id === updated.id) {
					return { ...board, ...updated }
				}
				return board
			})

			queryClient.setQueryData<Board[]>(
				[queryKeys.boards, { id: board.id_project }],
				newData,
			)

			return { previousData }
		},
		onSuccess: () => {
			toast.success("Board renamed successfully")
		},
		onError: (err, updated, context) => {
			queryClient.setQueryData<Board[]>(
				[queryKeys.boards, { id: board.id_project }],
				context?.previousData,
			)
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.boards, { id: board.id_project }],
			})
		},
	})

	if (!isRenaming) return <></>

	const onSubmit = () => {
		setIsRenaming(false)

		mut.mutate({
			...board,
			name,
		})
	}

	return (
		<>
			<Input
				id={FOCUS_IDS.projectTree.renaming}
				value={name}
				onBlur={() => setIsRenaming(false)}
				onChange={e => {
					setName(e.target.value)
				}}
				onKeyDown={e => {
					if (e.key === "Enter") {
						onSubmit()
					}
				}}
			/>
		</>
	)
}

const TreeItem = () => {
	const { board, isRenaming } = useProjectTreeItem()
	const { setSelectedBoard, boardSelected } = useBoardGlobal()
	const router = useRouter()

	const handleBoardClick = () => {
		if (board.id === INVALID_ID.boardTreeItem) return
		// Update the global board context
		setSelectedBoard(board)
		boardSelected.set(board)

		// Navigate to the board page
		const projectId = board.id_project
		router.push(`/boards/${projectId}`)
	}

	if (isRenaming) return <></>

	return (
		<li className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-2 w-full">
				<div className="size-5 flex justify-center">
					<div className="w-[1px] h-5 border border-slate-400 dark:border-neutral-700"></div>
				</div>
				<div
					className={cn(
						"flex items-center gap-2 p-1 transiton-all hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-sm cursor-pointer w-full",
						{
							"opacity-50": board.id === INVALID_ID.boardTreeItem,
							"text-orange-500 bg-orange-50 rounded-lg dark:bg-orange-950 dark:text-orange-300 transition-all hover:bg-orange-100 dark:hover:bg-orange-900":
								board.id === boardSelected.value?.id,
						},
					)}
					onClick={handleBoardClick}
				>
					<Icons.Misc.File className="size-5" />
					{board.name}
				</div>
			</div>
			<TreeItemActions />
		</li>
	)
}

export default function ProjectTreeItem({ board }: { board: Board }) {
	return (
		<ProjectTreeItemProvider board={board}>
			<TreeItemRenaming />
			<TreeItem />
		</ProjectTreeItemProvider>
	)
}
