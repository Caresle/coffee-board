"use server"

import { Tag } from "@/entities/tag.entity"
import { pgQuery } from "@/lib/pg"

const query = `
    select 
        *
    from tags
	order by name
`

export async function getAllTags(): Promise<Tag[]> {
	try {
		const data = await pgQuery(query)
		return data as Tag[]
	} catch (error) {
		console.error(error)
		return []
	}
}
