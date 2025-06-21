import { Separator } from "@/components/ui/separator"
import React, { useMemo } from "react"
import Icons from "../icons"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/constants/queryKeys"
import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"

export default function ProjectTree() {
	const pathName = usePathname()

	if (!pathName.includes("/boards/")) return <></>

	const boardId = +pathName.split("/boards/")[1] || 0
	const QBoards = useQuery({
		queryKey: [queryKeys.boards, { id: boardId }],
		queryFn: () => getAllBoardsByProject(+boardId),
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
					<li className="flex items-center gap-2" key={board.id}>
						<div className="size-5 flex justify-center">
							<div className="w-[1px] h-5 border border-slate-400 dark:border-neutral-700"></div>
						</div>
						<div className="flex items-center gap-2 p-1 transiton-all hover:bg-slate-100 dark:hover:bg-neutral-700 rounded-sm cursor-pointer w-full">
							<Icons.Misc.File className="size-5" />
							{board.name}
						</div>
					</li>
				))}
			</ul>
			<Button
				variant="ghost"
				className="w-full flex items-center justify-start gap-2"
			>
				<Icons.Actions.Add className="size-5" />
				Add board
			</Button>
		</div>
	)
}
