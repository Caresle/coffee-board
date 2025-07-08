import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskHistoryValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTaskHistory } from "./queries"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface HistoryParams {
	params: Promise<{ task: string }>
}

const createHistory = async (req: NextRequest, { params }: HistoryParams) => {
	try {
		const { task } = await params

		const json = await req.json()
		const validated = taskHistoryValidator.parse({ id_task: +task, ...json })

		const result =
			(
				await pgQuery(QueriesTaskHistory.createTaskHistory, [
					validated.id_task,
					validated.msg,
					validated.id_user,
				])
			)?.[0] ?? null

		return apiResponse({
			data: result,
			message: "Task history created successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}

export const POST = async (req: NextRequest, params: HistoryParams) =>
	hasAccess({
		method: createHistory,
		permission: PERMISSIONS.CreateTasks.name,
		req,
		params,
	})
