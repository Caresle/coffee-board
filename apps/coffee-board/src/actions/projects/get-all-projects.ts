"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    SELECT * FROM v_cf_projects_base
`

export async function getAllProjects() {
	try {
		const data = await pgQuery(query)
		return data
	} catch (error) {
		console.error(error)
		return []
	}
}
