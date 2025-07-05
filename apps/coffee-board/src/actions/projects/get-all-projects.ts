"use server"

import { Project } from "@/entities/project.entity"
import { pgQuery } from "@/lib/pg"
import { getTokenData } from "../get-token-data"

const query = `
    SELECT * FROM v_cf_projects_base
	where deleted = 0
		and id_user = $1
	order by id desc
`

export async function getAllProjects(): Promise<Project[]> {
	try {
		const token = await getTokenData()
		const data = await pgQuery(query, [token?.id])
		return data as Project[]
	} catch (error) {
		console.error(error)
		return []
	}
}
