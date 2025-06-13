import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { taskCheckListItemValidator } from "@/validators/task.validator"
import { NextRequest } from "next/server"
import { QueriesTaskChecklistItem } from "./queries"

interface CheckListItemParams {
	params: Promise<{ task: string; checklist: string }>
}

export async function POST(req: NextRequest, { params }: CheckListItemParams) {
	try {
		const { checklist } = await params

		const json = await req.json()

		const detail = json.details?.[0] ?? {}
		const validated = taskCheckListItemValidator.parse({
			id_checklist: +checklist,
			...detail,
		})

		const data = (
			await pgQuery(QueriesTaskChecklistItem.createCheckListItem, [
				validated.id_checklist,
				validated.name,
				validated.completed,
				validated.level,
				validated.id_parent,
			])
		)?.[0]

		return apiResponse({
			message: "CheckList item created successfully",
			data,
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
