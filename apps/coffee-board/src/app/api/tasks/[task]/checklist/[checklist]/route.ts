import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskChecklistUpdateValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTaskChecklist } from "../queries"

interface CheckListParams {
	params: Promise<{ task: string; checklist: string }>
}

export async function PUT(req: NextRequest, params: CheckListParams) {
	try {
		const { checklist } = await params.params
		const json = await req.json()

		const validated = taskChecklistUpdateValidator.parse({
			id: +checklist,
			...json,
		})

		const data =
			(
				await pgQuery(QueriesTaskChecklist.updateCheckListHeader, [
					validated.id,
					validated.name,
				])
			)?.[0] ?? null

		return apiResponse({
			message: "Checklist updated successfully",
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}

export async function DELETE(_: NextRequest, params: CheckListParams) {
	try {
		const { checklist } = await params.params

		const data =
			(
				await pgQuery(QueriesTaskChecklist.deleteCheckListHeader, [+checklist])
			)?.[0] ?? null

		return apiResponse({
			message: "Checklist deleted successfully",
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
