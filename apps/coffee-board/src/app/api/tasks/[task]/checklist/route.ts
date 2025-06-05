import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskCheckListValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTaskChecklist } from "./queries"

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ task: string }> },
) {
	try {
		const { task } = await params
		const json = await req.json()

		const validated = taskCheckListValidator.parse({ id_task: +task, ...json })

		const data =
			(
				await pgQuery(QueriesTaskChecklist.createCheckListHeader, [
					validated.id_task,
					validated.name,
				])
			)?.[0] ?? null

		return apiResponse({
			message: "Task checklist created successfully",
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
