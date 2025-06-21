import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"
import Client from "./client"

export default async function BoardPage({
	params,
}: {
	params: Promise<{ board: string }>
}) {
	const { board } = await params
	const boardData = await getAllBoardsByProject(+board)

	return <Client initialBoards={boardData} boardId={+board} />
}
