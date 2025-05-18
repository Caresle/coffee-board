"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    SELECT * FROM v_cf_projects_base
    where id = $1
`

export async function getProjectById(id: number) {
	try {
		const data = (await pgQuery(query, [id]))?.[0] ?? null
		return data
	} catch (error) {
		console.error(error)
		return null
	}
}
