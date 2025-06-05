import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesTaskHistory } from "../queries"
import { taskHistoryUpdateValidator } from "@/validators/task.validator"

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ task: string; history: string }> },
) {
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

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ task: string; history: string }> },
) {
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
