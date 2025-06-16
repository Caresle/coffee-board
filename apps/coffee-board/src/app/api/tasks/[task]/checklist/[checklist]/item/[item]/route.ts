import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { NextRequest } from "next/server"
import { QueriesTaskChecklistItem } from "../queries"
import { pgQuery } from "@/lib/pg"

interface CheckListItemParams {
	params: Promise<{ task: string; checklist: string; item: string }>
}

export async function DELETE(_: NextRequest, { params }: CheckListItemParams) {
	try {
		const { item } = await params

		const data = (
			await pgQuery(QueriesTaskChecklistItem.deleteCheckListItem, [item])
		)?.[0]

		return apiResponse({
			data,
			message: "CheckList item deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({
			error,
		})
	}
}
