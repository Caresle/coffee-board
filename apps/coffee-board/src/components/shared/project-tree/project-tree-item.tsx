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

const TreeItemActions = () => {
	const { update } = useTreeItemDeleteStore.getState()
	const { board } = useProjectTreeItem()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem>
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

export default function ProjectTreeItem({ board }: { board: Board }) {
	const { setSelectedBoard, boardSelected } = useBoardGlobal()
	const router = useRouter()

	const handleBoardClick = () => {
		// Update the global board context
		setSelectedBoard(board)
		boardSelected.set(board)

		// Navigate to the board page
		const projectId = board.id_project
		router.push(`/boards/${projectId}`)
	}

	return (
		<ProjectTreeItemProvider board={board}>
			<li className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 w-full">
					<div className="size-5 flex justify-center">
						<div className="w-[1px] h-5 border border-slate-400 dark:border-neutral-700"></div>
					</div>
					<div
						className="flex items-center gap-2 p-1 transiton-all hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-sm cursor-pointer w-full"
						onClick={handleBoardClick}
					>
						<Icons.Misc.File className="size-5" />
						{board.name}
					</div>
				</div>
				<TreeItemActions />
			</li>
		</ProjectTreeItemProvider>
	)
}
