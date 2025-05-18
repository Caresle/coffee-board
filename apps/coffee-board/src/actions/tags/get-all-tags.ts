"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select 
        *
    from tags
	order by name
`

export async function getAllTags() {
	try {
		const data = await pgQuery(query)
		return data
	} catch (error) {
		console.error(error)
		return []
	}
}
