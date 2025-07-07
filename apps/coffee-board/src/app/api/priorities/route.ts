import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { priorityValidator } from "@/validators/priority.validator"
import { NextRequest } from "next/server"
import { QueriesPriority } from "./queries"
import { getAllPriorities } from "@/actions/priority/get-all-priorities"
import { appCache } from "@/lib/cache"
import { CACHE_KEYS } from "@/constants/cacheKeys"

export async function GET() {
	try {
		const hasCache = await appCache.get(CACHE_KEYS.priorities)

		if (hasCache) return apiResponse({ data: hasCache, message: "Cache hit" })

		const priorities = await getAllPriorities()

		await appCache.set(CACHE_KEYS.priorities, priorities)
		return apiResponse({
			data: priorities,
			message: "Priorities retrieved successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export async function POST(req: NextRequest) {
	try {
		const validated = priorityValidator.parse(await req.json())
		const value = (
			await pgQuery(QueriesPriority.createPriority, [
				validated.name,
				validated.value,
			])
		)?.[0]

		await appCache.delete(CACHE_KEYS.priorities)
		return apiResponse({
			data: value,
			message: "Priority created successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}
