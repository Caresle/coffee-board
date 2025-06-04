import { getTaskById } from "@/actions/tasks/get-task-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskUpdateValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTask } from "../queries"

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ task: string }> },
) {
	try {
		const { task } = await params

		const taskData = await getTaskById(+task)

		return apiResponse({ data: taskData, message: "Task fetched successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ task: string }> },
) {
	try {
		const { task } = await params
		const json = await req.json()
		const validated = taskUpdateValidator.parse({ id: +task, ...json })

		const result =
			(
				await pgQuery(QueriesTask.updateTask, [
					validated.id,
					validated.name,
					validated.description,
					validated.date_begin,
					validated.date_end,
					validated.id_priority,
					validated.id_assigned,
					validated.time_estimation,
				])
			)?.[0] ?? null

		return apiResponse({ data: result, message: "Task updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ task: string }> },
) {
	try {
		const { task } = await params

		const result = (await pgQuery(QueriesTask.deleteTask, [+task]))?.[0] ?? null

		return apiResponse({ data: result, message: "Task deleted successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
