"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    SELECT * FROM tags WHERE id = $1
`

export async function getTagById(id: number) {
	try {
		const data = await pgQuery(query, [id])
		return data?.[0] ?? null
	} catch (error) {
		console.error(error)
		return null
	}
}
