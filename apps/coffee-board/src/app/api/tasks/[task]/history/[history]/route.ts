import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesTaskHistory } from "../queries"
import { taskHistoryUpdateValidator } from "@/validators/task.validator"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface HistoryParams {
	params: Promise<{ task: string; history: string }>
}

const updateHistory = async (req: NextRequest, { params }: HistoryParams) => {
	try {
		const { task, history } = await params

		const json = await req.json()

		const validated = taskHistoryUpdateValidator.parse({
			id: +history,
			id_task: +task,
			...json,
		})

		const data =
			(
				await pgQuery(QueriesTaskHistory.update, [validated.id, validated.msg])
			)?.[0] ?? null

		return apiResponse({
			data,
			message: "Task history updated successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}

const deleteHistory = async (_: NextRequest, { params }: HistoryParams) => {
	try {
		const { history } = await params

		const data =
			(await pgQuery(QueriesTaskHistory.delete, [+history]))?.[0] ?? null

		return apiResponse({
			data,
			message: "Task history deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}

export const PUT = async (req: NextRequest, params: HistoryParams) =>
	hasAccess<HistoryParams>({
		method: updateHistory,
		permission: PERMISSIONS.UpdateTasks.name,
		params,
		req,
	})

export const DELETE = async (req: NextRequest, params: HistoryParams) =>
	hasAccess<HistoryParams>({
		method: deleteHistory,
		permission: PERMISSIONS.DeleteTasks.name,
		params,
		req,
	})
