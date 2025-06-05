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

		const validated = taskCheckListItemValidator.parse({
			id_checklist: +checklist,
			...json,
		})

		// const data = await pgQuery(QueriesTaskChecklistItem.createCheckListItem)

		return apiResponse({
			message: "CheckList item created successfully",
			data: {},
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
