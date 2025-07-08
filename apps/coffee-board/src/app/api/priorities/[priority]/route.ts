import { getPriorityById } from "@/actions/priority/get-priority-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesPriority } from "../queries"
import { priorityUpdateValidator } from "@/validators/priority.validator"
import { appCache } from "@/lib/cache"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface PriorityParams {
	params: Promise<{ priority: string }>
}

const getPriority = async (_: NextRequest, { params }: PriorityParams) => {
	try {
		const priority = (await params).priority
		const data = await getPriorityById(+priority)
		return apiResponse({ data, message: "Priority retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const updatePriority = async (req: NextRequest, { params }: PriorityParams) => {
	try {
		const priority = (await params).priority
		const json = await req.json()

		const validated = priorityUpdateValidator.parse({ id: priority, ...json })

		const data = await pgQuery(QueriesPriority.updatePriority, [
			validated.name,
			validated.value,
			validated.id,
		])

		await appCache.delete(CACHE_KEYS.priorities)

		return apiResponse({ data, message: "Priority updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const deletePriority = async (_: NextRequest, { params }: PriorityParams) => {
	try {
		const priority = (await params).priority
		const value = await pgQuery(QueriesPriority.deletePriority, [priority])

		await appCache.delete(CACHE_KEYS.priorities)

		return apiResponse({
			data: value,
			message: "Priority deleted successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const GET = async (req: NextRequest, params: PriorityParams) =>
	hasAccess({
		method: getPriority,
		permission: PERMISSIONS.ReadPriority.name,
		params,
		req,
	})

export const PUT = async (req: NextRequest, params: PriorityParams) =>
	hasAccess<PriorityParams>({
		method: updatePriority,
		permission: PERMISSIONS.UpdatePriority.name,
		params,
		req,
	})

export const DELETE = async (req: NextRequest, params: PriorityParams) =>
	hasAccess<PriorityParams>({
		method: deletePriority,
		permission: PERMISSIONS.DeletePriority.name,
		params,
		req,
	})
