"use server"

import { Project } from "@/entities/project.entity"
import { pgQuery } from "@/lib/pg"
import { getTokenData } from "../get-token-data"
import { CACHE_KEYS } from "@/constants/cacheKeys"
import { appCache } from "@/lib/cache"

const query = `
    SELECT * FROM v_cf_projects_base
	where deleted = 0
		and id_user = $1
	order by id desc
`

export async function getAllProjects(): Promise<Project[]> {
	try {
		const token = await getTokenData()

		const cacheKey = CACHE_KEYS.projects(token?.id || 0)
		const cachedData = await appCache.get(cacheKey)

		if (cachedData) {
			return cachedData as Project[]
		}
		const data = await pgQuery(query, [token?.id])

		await appCache.set(cacheKey, data)
		return data as Project[]
	} catch (error) {
		console.error(error)
		return []
	}
}
