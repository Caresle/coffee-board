import React from "react"
import { useBoard } from "../../_hook/use-board"
import BoardMenu from "./board-menu"
import BoardAddTaskButton from "./board-add-task-button"
import { Button } from "@/components/ui/button"
import { useBoardGlobal } from "@/hooks/use-board-global"
import Icons from "@/components/shared/icons"

const CancelReOrder = () => {
	const { setReOrderBoard } = useBoardGlobal()
	return (
		<Button
			variant={"ghost"}
			className="w-fit"
			onClick={() => setReOrderBoard(false)}
		>
			<Icons.Actions.Close />
		</Button>
	)
}

export default function BoardHeader() {
	const { reOrderBoard } = useBoardGlobal()
	const { boardDetail } = useBoard()

	return (
		<div className="flex items-center justify-between">
			<div className="w-full">
				<Button
					variant={"ghost"}
					className="w-full flex items-center justify-start"
				>
					<h2 className="text-xl font-bold capitalize">{boardDetail.name}</h2>
				</Button>
			</div>
			<div className="w-fit flex items-center">
				{reOrderBoard && <CancelReOrder />}
				{!reOrderBoard && (
					<>
						<BoardMenu />
						<BoardAddTaskButton />
					</>
				)}
			</div>
		</div>
	)
}
