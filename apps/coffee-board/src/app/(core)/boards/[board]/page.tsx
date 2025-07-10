import getAllBoardsByProject from "@/actions/boards/get-all-boards-by-project"
import Client from "./client"
import { getProjectById } from "@/actions/projects/get-project-by-id"

export default async function BoardPage({
	params,
}: {
	params: Promise<{ board: string }>
}) {
	const { board } = await params
	const boardData = await getAllBoardsByProject(+board)
	const project = await getProjectById(+board)


	return <Client initialBoards={boardData} boardId={+board} initialProject={project}/>
}
