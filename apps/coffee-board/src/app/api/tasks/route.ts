import { getAllTasks } from "@/actions/tasks/get-all-tasks"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTask } from "./queries"

export async function GET(req: NextRequest) {
	try {
		const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries())

		const { id_board_det } = searchParams

		if (!id_board_det) {
			return apiResponse({
				data: [],
				message: "No board ID provided",
				status: 400,
			})
		}

		const data = await getAllTasks(+id_board_det)

		return apiResponse({
			data,
			message: "Tasks fetched successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}

export async function POST(req: NextRequest) {
	try {
		const validated = taskValidator.parse(await req.json())

		const result =
			(
				await pgQuery(QueriesTask.createTask, [
					validated.id_board_det,
					validated.name,
					validated.description,
					validated.date_begin,
					validated.date_end,
					validated.id_priority,
					validated.id_assigned,
					validated.time_estimation,
				])
			)?.[0] ?? null

		return apiResponse({
			data: result,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
