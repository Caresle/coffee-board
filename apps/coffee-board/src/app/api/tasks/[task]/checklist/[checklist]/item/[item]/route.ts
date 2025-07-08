import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { NextRequest } from "next/server"
import { QueriesTaskChecklistItem } from "../queries"
import { pgQuery } from "@/lib/pg"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface CheckListItemParams {
	params: Promise<{ task: string; checklist: string; item: string }>
}

const deleteCheckListItem = async (
	_: NextRequest,
	{ params }: CheckListItemParams,
) => {
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

export const DELETE = async (req: NextRequest, params: CheckListItemParams) =>
	hasAccess<CheckListItemParams>({
		method: deleteCheckListItem,
		permission: PERMISSIONS.DeleteTasks.name,
		params,
		req,
	})
