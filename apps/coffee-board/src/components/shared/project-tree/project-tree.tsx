import { Separator } from "@/components/ui/separator"
import { useMemo } from "react"
import Icons from "../icons"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"
import AddBoardButton from "./add-board-button"
import ProjectTreeItem from "./project-tree-item"

export default function ProjectTree() {
	const pathName = usePathname()

	if (!pathName.includes("/boards/")) return <></>

	const projectId = +pathName.split("/boards/")[1] || 0
	const QBoards = useQuery({
		queryKey: [queryKeys.boards, { id: projectId }],
		queryFn: () => getAllBoardsByProject(+projectId),
	})

	const data = useMemo(() => QBoards.data || [], [QBoards.data])

	return (
		<div className="p-1">
			<Separator />
			<ul>
				<li className="flex items-center gap-2 p-2">
					<Icons.Misc.Folder className="size-5" />
					Boards
				</li>
				{data.map(board => (
					<ProjectTreeItem board={board} key={board.id} />
				))}
			</ul>
			<AddBoardButton projectId={projectId} />
		</div>
	)
}
