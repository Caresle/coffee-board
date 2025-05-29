"use server"

import { Project } from "@/entities/project.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    SELECT * FROM v_cf_projects_base
`

export async function getAllProjects(): Promise<Project[]> {
	try {
		const data = await pgQuery(query)
		return data as Project[]
	} catch (error) {
		console.error(error)
		return []
	}
}
