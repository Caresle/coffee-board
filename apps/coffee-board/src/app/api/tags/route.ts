import { getAllTags } from "@/actions/tags/get-all-tags"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { tagValidator } from "@/validators/tag.validator"
import { NextRequest } from "next/server"
import { QueriesTag } from "./queries"
import { appCache } from "@/lib/cache"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

const getTags = async () => {
	try {
		const hasCache = await appCache.get(CACHE_KEYS.tags)

		if (hasCache) return apiResponse({ data: hasCache, message: "Cache hit" })

		const tags = await getAllTags()
		await appCache.set(CACHE_KEYS.tags, tags)
		return apiResponse({ data: tags, message: "Tags retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const createTag = async (req: NextRequest) => {
	try {
		const data = tagValidator.parse(await req.json())
		const value = (
			await pgQuery(QueriesTag.createTag, [data.name, data.color])
		)?.[0]

		appCache.delete(CACHE_KEYS.tags)

		return apiResponse({ data: value, message: "Tag created successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const GET = () =>
	hasAccess({
		permission: PERMISSIONS.ReadTags.name,
		method: getTags,
	})

const POST = (req: NextRequest) =>
	hasAccess({ permission: PERMISSIONS.CreateTag.name, method: createTag, req })

export { GET, POST }
