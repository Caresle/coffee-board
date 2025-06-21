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

const TreeItemActions = () => {
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
					Edit description
				</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">
					<Icons.Actions.Delete className="size-5" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default function ProjectTreeItem({ board }: { board: Board }) {
	return (
		<li className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-2 w-full">
				<div className="size-5 flex justify-center">
					<div className="w-[1px] h-5 border border-slate-400 dark:border-neutral-700"></div>
				</div>
				<div className="flex items-center gap-2 p-1 transiton-all hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-sm cursor-pointer w-full">
					<Icons.Misc.File className="size-5" />
					{board.name}
				</div>
			</div>
			<TreeItemActions />
		</li>
	)
}
