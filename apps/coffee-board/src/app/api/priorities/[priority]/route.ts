import { getPriorityById } from "@/actions/priority/get-priority-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesPriority } from "../queries"
import { priorityUpdateValidator } from "@/validators/priority.validator"

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ priority: string }> },
) {
	try {
		const priority = (await params).priority
		const data = await getPriorityById(+priority)
		return apiResponse({ data, message: "Priority retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ priority: string }> },
) {
	try {
		const priority = (await params).priority
		const json = await req.json()

		const validated = priorityUpdateValidator.parse({ id: priority, ...json })

		const data = await pgQuery(QueriesPriority.updatePriority, [
			validated.name,
			validated.value,
			validated.id,
		])

		return apiResponse({ data, message: "Priority updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function DELETE(
	_: NextRequest,
	{ params }: { params: Promise<{ priority: string }> },
) {
	try {
		const priority = (await params).priority
		const value = await pgQuery(QueriesPriority.deletePriority, [priority])

		return apiResponse({
			data: value,
			message: "Priority deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
