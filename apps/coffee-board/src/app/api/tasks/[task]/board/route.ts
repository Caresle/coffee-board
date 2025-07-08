import { PERMISSIONS } from "@/constants/access"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { hasAccess } from "@/middlewares/has-access"
import { taskUpdateBoard } from "@/validators/task.validator"
import { NextRequest } from "next/server"

interface TaskBoardUpdate {
	params: Promise<{ task: string }>
}

const query = `
    UPDATE tasks
    SET id_board_det = $1
    WHERE id = $2
`

const updateTaskBoard = async (
	req: NextRequest,
	{ params }: TaskBoardUpdate,
) => {
	try {
		const { task } = await params

		const json = await req.json()

		const validated = taskUpdateBoard.parse({
			id_task: +task,
			...json,
		})

		await pgQuery(query, [validated.id_board_det, validated.id_task])

		return apiResponse({
			data: validated,
			message: "Task updated successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const PUT = async (req: NextRequest, params: TaskBoardUpdate) =>
	hasAccess({
		method: updateTaskBoard,
		permission: PERMISSIONS.UpdateTasks.name,
		params,
		req,
	})
