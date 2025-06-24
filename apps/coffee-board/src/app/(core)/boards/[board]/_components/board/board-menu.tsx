"use client"

import Icons from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"
import {
	useDetailArchiveStore,
	useDetailDeleteStore,
} from "../../_states/boardDetails.state"
import { useBoard } from "../../_hook/use-board"

const DeleteDetail = () => {
	const { update } = useDetailDeleteStore.getState()
	const { boardDetail } = useBoard()

	const onDelete = () => {
		update({
			show: true,
			item: boardDetail,
		})
	}

	return (
		<DropdownMenuItem
			onClick={() => onDelete()}
			className="text-red-500 hover:text-red-600"
		>
			<Icons.Actions.Delete className="text-red-500 hover:text-red-600" />
			Delete
		</DropdownMenuItem>
	)
}

const ArchiveDetail = () => {
	const { update } = useDetailArchiveStore.getState()
	const { boardDetail } = useBoard()

	const onArchive = () => {
		update({
			show: true,
			item: boardDetail,
		})
	}
	return (
		<DropdownMenuItem
			onClick={() => onArchive()}
			className="text-purple-500 hover:text-purple-600"
		>
			<Icons.Misc.Archive className="text-purple-500 hover:text-purple-600" />
			Archive
		</DropdownMenuItem>
	)
}

export default function BoardMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Icons.Misc.Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<ArchiveDetail />
				<DeleteDetail />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
