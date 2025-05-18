"use server"

import { pgQuery } from "@/lib/pg"

const query = `
    select * from priorities
    where id = $1
`

export async function getPriorityById(id: number) {
	try {
		const data = (await pgQuery(query, [id]))?.[0] ?? null
		return data
	} catch (error) {
		console.error(error)
		return null
	}
}
