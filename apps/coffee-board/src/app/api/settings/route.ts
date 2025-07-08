import { getTokenData } from "@/actions/get-token-data"
import { PERMISSIONS } from "@/constants/access"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { apiResponse, apiResponseError } from "@/helpers/api-response"
import { appCache } from "@/lib/cache"
import { pgQuery } from "@/lib/pg"
import { hasAccess } from "@/middlewares/has-access"
import { NextRequest } from "next/server"
import { z } from "zod"

const queries = {
	getRecord: `
        SELECT * FROM settings
        where id_user = $1
    `,
	create: `
        call p_updateSettings($1, $2, $3, $4)
    `,
}

const validator = z.object({
	theme: z.number().optional().default(0),
	animations: z.number().optional().default(0),
	emailNotifications: z.number().optional().default(0),
})

const getSettings = async () => {
	try {
		const token = await getTokenData()

		if (!token) {
			return apiResponseError({ error: "Unauthorized", status: 401 })
		}

		const hasCache = await appCache.get(CACHE_KEYS.settings(token.id))

		if (hasCache) return apiResponse({ data: hasCache, message: "Cache hit" })

		const data = (await pgQuery(queries.getRecord, [token.id]))?.[0]

		await appCache.set(CACHE_KEYS.settings(token.id), data, 60 * 60 * 24)

		return apiResponse({ data, message: "Settings retrieved successfully" })
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

const createSettings = async (req: NextRequest) => {
	try {
		const body = await req.json()
		const token = await getTokenData()

		const validated = validator.parse(body)
		if (!token) {
			return apiResponseError({ error: "Unauthorized", status: 401 })
		}

		await pgQuery(queries.create, [
			token.id,
			validated.theme,
			validated.animations,
			validated.emailNotifications,
		])

		await appCache.delete(CACHE_KEYS.settings(token.id))

		return apiResponse({
			data: validated,
			message: "Settings updated successfully",
		})
	} catch (error) {
		console.error(error)
		return apiResponseError({ error })
	}
}

export const GET = async () =>
	hasAccess({ method: getSettings, permission: PERMISSIONS.ReadSettings.name })

export const POST = async (req: NextRequest) =>
	hasAccess({
		method: createSettings,
		permission: PERMISSIONS.UpdateSettings.name,
		req,
	})
