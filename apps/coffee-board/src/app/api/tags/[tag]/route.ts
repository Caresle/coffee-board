import { getTagById } from "@/actions/tags/get-tag-by-id"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { pgQuery } from "@/lib/pg"
import { NextRequest } from "next/server"
import { QueriesTag } from "../queries"
import { tagUpdateValidator } from "@/validators/tag.validator"
import { appCache } from "@/lib/cache"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { hasAccess } from "@/middlewares/has-access"
import { PERMISSIONS } from "@/constants/access"

interface TagParams {
	params: Promise<{ tag: string }>
}

const getTag = async (
	_: NextRequest,
	{ params }: TagParams,
): Promise<Response> => {
	try {
		const tag = (await params).tag
		const data = await getTagById(+tag)

		return apiResponse({ data, message: "Tag retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const updateTag = async (req: NextRequest, { params }: TagParams) => {
	try {
		const tag = (await params).tag
		const json = await req.json()

		const validated = tagUpdateValidator.parse({ id: tag, ...json })

		const data = (
			await pgQuery(QueriesTag.updateTag, [
				validated.name,
				validated.color,
				validated.id,
			])
		)?.[0]

		await appCache.delete(CACHE_KEYS.tags)

		return apiResponse({ data, message: "Tag updated successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const deleteTag = async (_: NextRequest, { params }: TagParams) => {
	try {
		const tag = (await params).tag
		const value = (await pgQuery(QueriesTag.deleteTag, [tag]))?.[0]
		await appCache.delete(CACHE_KEYS.tags)

		return apiResponse({ data: value, message: "Tag deleted successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const GET = (req: NextRequest, params: TagParams) =>
	hasAccess<TagParams>({
		method: getTag,
		permission: PERMISSIONS.ReadTags.name,
		params,
		req,
	})

export const PUT = (req: NextRequest, params: TagParams) =>
	hasAccess<TagParams>({
		method: updateTag,
		permission: PERMISSIONS.UpdateTag.name,
		params,
		req,
	})

export const DELETE = (req: NextRequest, params: TagParams) =>
	hasAccess<TagParams>({
		method: deleteTag,
		permission: PERMISSIONS.DeleteTag.name,
		params,
		req,
	})
